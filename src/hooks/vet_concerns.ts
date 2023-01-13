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
  setDoc,
  writeBatch
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import visit from '@/pages/visit'
import { VetConcern, Visit } from '@/types/types'

export const useVetConcerns = () => {
  const queryFn = async () => {
    try {
      const vetConcernsRef = collection(db, 'vet_concerns')
      const vetConcernsDocs = await getDocs(vetConcernsRef)
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
  return useQuery(['vetConcerns'], queryFn)
}

export const useMutateVetConcerns = () => {
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const mutationFn = async (
    vetConcern: VetConcern & { deleteDoc?: boolean }
  ) => {
    try {
      const { docId: vetConcernId, ...vetConcernMut } = vetConcern
      const collectionRef = collection(db, 'vet_concern')

      const docRef = vetConcernId
        ? doc(collectionRef, vetConcernId)
        : doc(collectionRef)

      if (vetConcernMut.deleteDoc) {
        await deleteDoc(docRef)
      } else {
        setVetConcern(docRef, vetConcernMut)
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
      text: 'Updated vet concerns',
      position: 'bottom',
      showFor: 1000
    })
  }
  const onError = () => {
    setAlert({
      variant: AlertVariant.critical,
      title: 'Error!',
      text: 'Could not update vet concern',
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

const setVetConcern = async (
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
    vetConcernMut.user_uid,
    'visits',
    vetConcernMut.visit_id
  )
  const visitData = (await getDoc(visitRef)).data() as Visit
  const notes = visitData.notes
  visitData.notes =
    notes == '' ? '-' + vetConcernMut.detail : '\n-' + vetConcernMut.detail
  batch.set(visitRef, visitData, { merge: true })

  await batch.commit()
}
