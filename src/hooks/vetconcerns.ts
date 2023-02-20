import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  collection,
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
import { VetConcern, Visit } from '@/types/types'
import { humanizeTimestamp } from '@/utils'

export const useVetConcerns = () => {
  const queryFn = async () => {
    try {
      const vetConcernsRef = collection(db, 'vet_concerns')
      const q = query(vetConcernsRef, orderBy('createdAt', 'desc'))
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
  return useQuery(['vetConcerns'], queryFn)
}

export const useMutateVetConcerns = () => {
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const mutationFn = async (vetConcern: VetConcern & { docId?: string }) => {
    try {
      const { docId: vetConcernId, ...vetConcernMut } = vetConcern
      const collectionRef = collection(db, 'vet_concerns')

      if (vetConcernId) {
        await setDoc(doc(collectionRef, vetConcernId), vetConcernMut, {
          merge: true
        })
      } else {
        await addVetConcern(doc(collectionRef), vetConcern)
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
    queryClient.invalidateQueries({ queryKey: ['vetConcerns'] })
    queryClient.invalidateQueries({ queryKey: ['visits'] })
    setAlert({
      variant: AlertVariant.info,
      title: 'Success!',
      text: 'Updated vet concern',
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
