/* eslint-disable no-console */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  collection,
  doc,
  DocumentReference,
  FirestoreError,
  getDoc,
  getDocs,
  writeBatch
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { AlertVariant, useAlert } from '@/context/AlertContext'
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

  const mutationFn = async (vetConcern: VetConcern) => {
    try {
      const collectionRef = collection(db, 'vet_concerns')
      const docRef = doc(collectionRef)
      await addVetConcern(docRef, vetConcern)
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
    queryClient.invalidateQueries({ queryKey: ['visit'] })
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
  visitData.notes =
    notes == ''
      ? '- ' + vetConcernMut.detail
      : notes + '\n- ' + vetConcernMut.detail
  batch.set(visitRef, visitData, { merge: true })

  await batch.commit()
}
