import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  getDocs,
  setDoc
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useAuth } from '@/context/Firebase/Auth/context'
import { canDelete } from '@/hooks/utils'
import { Incident } from '@/types/types'

export const useIncidents = () => {
  const { currentUser } = useAuth()
  const queryFn = async (): Promise<Incident[]> => {
    try {
      if (currentUser?.uid) {
        const incidentsRef = collection(db, 'incidents')
        const incidentsDocs = await getDocs(incidentsRef)
        return incidentsDocs.docs.map(
          (doc) => ({ ...doc.data(), docId: doc.id } as Incident)
        )
      }
    } catch (err: unknown) {
      //#region  //*=========== For logging ===========
      if (err instanceof FirestoreError) {
        console.error(err.message)
      } else console.error(err)
      //#endregion  //*======== For logging ===========
    }
    return []
  }
  return useQuery(['incidents'], queryFn)
}

export const useMutateIncidents = () => {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const mutationFn = async (incident: Incident | { docId?: string }) => {
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
          await setDoc(docRef, incidentMut, { merge: true })
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
