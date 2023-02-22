import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  orderBy,
  query,
  writeBatch
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useAuth } from '@/context/Firebase/Auth/context'
import { canDelete } from '@/hooks/utils'
import { Incident, Visit } from '@/types/types'
import { humanizeTimestamp } from '@/utils'

export const useIncidents = () => {
  const { currentUser } = useAuth()
  const queryFn = async () => {
    if (currentUser?.uid) {
      const incidentsRef = collection(db, 'incidents')
      const q = query(incidentsRef, orderBy('createdAt', 'desc'))
      const incidentsDocs = await getDocs(q)
      return incidentsDocs.docs.map(
        (doc) => ({ ...doc.data(), docId: doc.id } as Incident)
      )
    }
  }
  return useQuery(['incidents'], queryFn)
}

export const useMutateIncidents = () => {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const mutationFn = async (incident: Incident & { docId?: string }) => {
    if (currentUser?.uid) {
      const { docId: incidentId, ...incidentMut } = incident
      const collectionRef = collection(db, 'incidents')

      const docRef = incidentId
        ? doc(collectionRef, incidentId)
        : doc(collectionRef)

      if (canDelete(incidentMut, incidentId)) {
        await deleteDoc(docRef)
      } else {
        await addIncident(docRef, incident)
      }
    }
  }

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['incidents'] })
    queryClient.invalidateQueries({ queryKey: ['visits'] })
    setAlert({
      variant: AlertVariant.info,
      title: 'Success!',
      text: 'Updated incidents',
      position: 'bottom',
      showFor: 1000
    })
  }
  const onError = () => {
    setAlert({
      variant: AlertVariant.critical,
      title: 'Error!',
      text: 'Could not update incident',
      position: 'bottom',
      showFor: 1000
    })
  }

  return useMutation({
    mutationFn,
    onSuccess,
    onError
  })
}

const addIncident = async (
  incidentRef: DocumentReference,
  incidentMut: Incident
) => {
  const batch = writeBatch(db)

  // Set incident
  batch.set(incidentRef, incidentMut, { merge: true })

  // Adding details to visit notes
  const visitRef = doc(
    db,
    'users',
    incidentMut.userID,
    'visits',
    incidentMut.visitId
  )
  const visitData = (await getDoc(visitRef)).data() as Visit
  const notes = visitData.notes
  // appending to notes if not empty.
  const newDetail = `${humanizeTimestamp(incidentMut.visitTime)}\n ${
    incidentMut.details
  }`
  visitData.notes = notes == '' ? `- ${newDetail}` : `${notes}\n- ${newDetail}`

  batch.set(visitRef, visitData, { merge: true })

  await batch.commit()
}
