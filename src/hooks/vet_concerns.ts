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
    vetConcern: VetConcern
  ) => {
    try {
      const collectionRef = collection(db, 'vet_concern')
      const docRef = doc(collectionRef)
      addVetConcern(docRef, vetConcern)
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
    vetConcernMut.user_uid,
    'visits',
    vetConcernMut.visit_id
  )
  const visitData = (await getDoc(visitRef)).data() as Visit
  const notes = visitData.notes
  // appending to notes if not empty.
  visitData.notes =
    notes == '' ? '\n-' + vetConcernMut.detail : notes + '\n-' + vetConcernMut.detail
  batch.set(visitRef, visitData, { merge: true })

  await batch.commit()
}
