import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  FirestoreError,
  getDoc,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useAuth } from '@/context/Firebase/Auth/context'
import { canDelete } from '@/hooks/utils'
import { Incident, Visit } from '@/types/types'
import { humanizeTimestamp } from '@/utils'

export const useIncidents = (visitId: string) => {
  const { currentUser } = useAuth()
  const queryFn = async () => {
    if (currentUser?.uid) {
      try {
        const incidentsRef = collection(
          db,
          'users',
          currentUser.uid,
          'visits',
          visitId,
          'incidents'
        )
        const q = query(incidentsRef, orderBy('reportTime', 'desc'))
        const incidentsDocs = await getDocs(q)
        return incidentsDocs.docs.map(
          (doc) => ({ ...doc.data(), docId: doc.id } as Incident)
        )
      } catch (err: unknown) {
        //#region  //*=========== For logging ===========
        if (err instanceof FirestoreError) {
          console.error(err.message)
        } else console.error(err)
        //#endregion  //*======== For logging ===========
      }
    }
  }
  return useQuery(['incidents'], queryFn)
}

export const useMutateIncidents = () => {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const mutationFn = async (incident: Incident & { docId?: string }) => {
    try {
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
    } catch (err: unknown) {
      console.error(err)
      //#region  //*=========== For logging ===========
      if (err instanceof FirestoreError) {
        console.error(err.message)
      } else console.error(err)
      //#endregion  //*======== For logging ===========
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
