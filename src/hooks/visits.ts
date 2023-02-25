import {
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useAuth } from '@/context/Firebase/Auth/context'
import { canDelete } from '@/hooks/utils'
import { Visit } from '@/types/types'
import { visitSchema } from '@/types/zod/schema'

const PAGE_SIZE = 20

export const useVisits = (isSearch: boolean) => {
  const { currentUser } = useAuth()

<<<<<<< HEAD
  const queryFn = async () => {
    if (currentUser?.uid) {
      try {
        const visitsRef = collection(db, 'users', currentUser.uid, 'visits')
        const q = query(visitsRef, orderBy('startTime', 'desc'))
        const visitsDocs = await getDocs(q)
        return visitsDocs.docs.map((doc) => {
          const rawData = doc.data()
          const parsedData = visitSchema.parse(rawData)
          return { ...parsedData, docId: doc.id } as Visit
        })
      } catch (err: unknown) {
        //#region  //*=========== For logging ===========
        if (err instanceof FirestoreError) {
          console.error(err.message)
        } else console.error(err)
        //#endregion  //*======== For logging ===========
      }
=======
  const queryFn = async ({ pageParam: lastDocId }: QueryFunctionContext) => {
    if (!currentUser?.uid) return
    const visitsRef = collection(db, 'users', currentUser.uid, 'visits')
    let q = query(visitsRef, orderBy('startTime', 'desc'))

    if (lastDocId !== undefined) {
      // Successive queries
      const docRef = doc(db, 'users', currentUser.uid, 'visits', lastDocId)
      const docSnap = await getDoc(docRef)

      q = query(q, startAfter(docSnap))
>>>>>>> main
    }

    if (!isSearch) {
      q = query(q, limit(PAGE_SIZE))
    }

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) => ({ ...doc.data(), docId: doc.id } as Visit)
    )
  }

  return useInfiniteQuery({
    queryKey: ['visits', isSearch],
    queryFn,
    getNextPageParam: (lastPage, _allPages): unknown | undefined => {
      if (isSearch) {
        return undefined
      }

      return lastPage?.length !== PAGE_SIZE
        ? undefined
        : lastPage?.at(lastPage.length - 1)?.docId
    }
  })
}

export const useMutateVisits = () => {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const mutationFn = async (visit: Visit | { docId?: string }) => {
    if (currentUser?.uid) {
      const { docId: visitId, ...visitMut } = visit
      const collectionRef = collection(db, 'users', currentUser.uid, 'visits')

      const docRef = visitId ? doc(collectionRef, visitId) : doc(collectionRef)

      if (canDelete(visitMut, visitId)) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, visitMut, { merge: true })
      }
    }
  }

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['visits'] })
    queryClient.invalidateQueries({ queryKey: ['user'] })
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
