/* eslint-disable no-console */

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
import { Contact } from '@/types/types'

export const useContacts = () => {
  const { currentUser } = useAuth()
  const queryFn = async () => {
    if (currentUser?.uid) {
      try {
        const contactsRef = collection(db, 'users', currentUser.uid, 'contacts')
        const contactsDocs = await getDocs(contactsRef)
        return contactsDocs.docs.map(
          (doc) => ({ ...doc.data(), docId: doc.id } as Contact)
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
  return useQuery(['contacts'], queryFn)
}

export const useMutateContacts = () => {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const mutationFn = async (contact: Contact | { docId?: string }) => {
    try {
      if (currentUser?.uid) {
        const { docId: contactId, ...contactMut } = contact
        const collectionRef = collection(
          db,
          'users',
          currentUser.uid,
          'contacts'
        )

        const docRef = contactId
          ? doc(collectionRef, contactId)
          : doc(collectionRef)

        if (canDelete(contactMut, contactId)) {
          await deleteDoc(docRef)
        } else {
          await setDoc(docRef, contactMut, { merge: true })
          return docRef.id
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
    queryClient.invalidateQueries({ queryKey: ['contacts'] })
    setAlert({
      variant: AlertVariant.info,
      title: 'Success!',
      text: 'Updated contacts',
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
