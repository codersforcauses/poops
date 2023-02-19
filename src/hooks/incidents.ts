/* eslint-disable no-console */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  getDocs,
  orderBy,
  query,
  setDoc
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useAuth } from '@/context/Firebase/Auth/context'
import { Incident } from '@/types/types'

export const useIncidents = ( visitId: string ) => {
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

  const mutationFn = async (incident: Incident & { deleteDoc?: boolean }) => {
    try {
      if (currentUser?.uid) {
        const { docId: incidentId, ...incidentMut } = incident
        const collectionRef = collection(db, 'incidents')

        const docRef = incidentId
          ? doc(collectionRef, incidentId)
          : doc(collectionRef)

        if (incidentMut.deleteDoc) {
          await deleteDoc(docRef)
        } else {
          await setDoc(docRef, incidentMut, { merge: true })
        }
      }
    } catch (err: unknown) {
      console.log(err)
      //#region  //*=========== For logging ===========
      if (err instanceof FirestoreError) {
        console.error(err.message)
      } else console.error(err)
      //#endregion  //*======== For logging ===========
    }
  }

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['incidents'] })
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
