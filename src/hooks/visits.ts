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
import { canDelete } from '@/hooks/utils'
import { Visit } from '@/types/types'

export const useVisits = () => {
  const { currentUser } = useAuth()

  const queryFn = async () => {
    if (currentUser?.uid) {
      try {
        const visitsRef = collection(db, 'users', currentUser.uid, 'visits')
        const q = query(visitsRef, orderBy('startTime', 'desc'))
        const visitsDocs = await getDocs(q)
        return visitsDocs.docs.map(
          (doc) => ({ ...doc.data(), docId: doc.id } as Visit)
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
  return useQuery(['visits'], queryFn)
}

export const useMutateVisits = () => {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const mutationFn = async (visit: Visit | { docId?: string }) => {
    try {
      if (currentUser?.uid) {
        const { docId: visitId, ...visitMut } = visit
        const collectionRef = collection(db, 'users', currentUser.uid, 'visits')

        const docRef = visitId
          ? doc(collectionRef, visitId)
          : doc(collectionRef)

        if (canDelete(visitMut, visitId)) {
          await deleteDoc(docRef)
        } else {
          await setDoc(docRef, visitMut, { merge: true })
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
    queryClient.invalidateQueries({ queryKey: ['visits'] })
    setAlert({
      variant: AlertVariant.info,
      title: 'Success!',
      text: 'Updated visits',
      position: 'bottom',
      showFor: 1000
    })
  }
  const onError = () => {
    setAlert({
      variant: AlertVariant.critical,
      title: 'Error!',
      text: 'Could not update contacts',
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
