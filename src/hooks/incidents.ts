import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useAuth } from '@/context/Firebase/Auth/context'
import { Incident, Status, Visit } from '@/types/types'
import { humanizeTimestamp } from '@/utils'

export const useIncidents = () => {
  const { currentUser } = useAuth()
  const queryFn = async () => {
    if (currentUser?.uid) {
      const incidentsRef = collection(db, 'incidents')
      const q = query(
        incidentsRef,
        orderBy('createdAt', 'desc'),
        where('status', '==', Status.unresolved)
      )
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

  const mutationFn = async (incident: Incident) => {
    if (currentUser?.uid) {
      const { docId: incidentId, ...incidentMut } = incident
      const collectionRef = collection(db, 'incidents')

      if (incidentId) {
        // updating incident
        await setDoc(doc(collectionRef, incidentId), incidentMut, {
          merge: true
        })
      } else {
        await addIncident(doc(collectionRef), incident)
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
