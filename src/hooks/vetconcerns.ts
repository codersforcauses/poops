/* eslint-disable no-console */

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
  query,
  setDoc,
  writeBatch
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useAuth } from '@/context/Firebase/Auth/context'
import { VetConcern, Visit } from '@/types/types'
import { humanizeTimestamp } from '@/utils'

export const useVetConcerns = (visitId: string) => {
  const { currentUser } = useAuth()
  const queryFn = async () => {
    if (currentUser?.uid) {
      try {
        const vetConcernsRef = collection(
          db,
          'users',
          currentUser.uid,
          'visits',
          visitId,
          'vet_concerns'
        )
        const q = query(vetConcernsRef, orderBy('reportTime', 'desc'))
        const vetConcernsDocs = await getDocs(q)
        return vetConcernsDocs.docs.map(
          (doc) => ({ ...doc.data(), docId: doc.id } as VetConcern)
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
  return useQuery(['vetConcerns'], queryFn)
}

export const useMutateVetConcerns = () => {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const mutationFn = async (
    vetConcern: VetConcern & { deleteDoc?: boolean }
  ) => {
    try {
      if (currentUser?.uid) {
        const { docId: vetConcernId, ...vetConcernMut } = vetConcern
        const collectionRef = collection(db, 'vet_concerns')

        const docRef = vetConcernId
          ? doc(collectionRef, vetConcernId)
          : doc(collectionRef)
        if (vetConcernMut.deleteDoc) {
          await deleteDoc(docRef)
        } else {
          await setDoc(docRef, vetConcernMut, { merge: true })
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
    queryClient.invalidateQueries({ queryKey: ['vetConcerns'] })
    setAlert({
      variant: AlertVariant.info,
      title: 'Success!',
      text: 'Vet concern submitted',
      position: 'bottom',
      showFor: 1000
    })
  }
  const onError = () => {
    setAlert({
      variant: AlertVariant.critical,
      title: 'Error!',
      text: 'Vet concern was not submitted',
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

const addVetConcern = async (
  vetConcernRef: DocumentReference,
  vetConcernMut: VetConcern
) => {
  const batch = writeBatch(db)

  // Set vet concern
  batch.set(vetConcernRef, vetConcernMut, { merge: true })

  // Adding details to visit notes
  const visitRef = doc(
    db,
    'users',
    vetConcernMut.userId,
    'visits',
    vetConcernMut.visitId
  )
  const visitData = (await getDoc(visitRef)).data() as Visit
  const notes = visitData.notes
  // appending to notes if not empty.
  const newDetail = `${humanizeTimestamp(vetConcernMut.visitTime)}\n ${
    vetConcernMut.detail
  }`
  visitData.notes = notes == '' ? `- ${newDetail}` : `${notes}\n- ${newDetail}`

  batch.set(visitRef, visitData, { merge: true })

  await batch.commit()
}
