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
import { useSetAtom } from 'jotai'

import { currentContactAtom } from '@/atoms/contacts'
import { db } from '@/components/Firebase/init'
import { useAuth } from '@/context/Firebase/Auth/context'
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
  const setCurrentContact = useSetAtom(currentContactAtom)

  const mutationFn = async (contact: Contact & { deleteDoc?: boolean }) => {
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

        if (contactMut.deleteDoc) {
          await deleteDoc(docRef)
          setCurrentContact(null)
        } else {
          await setDoc(docRef, contactMut, { merge: true })
          setCurrentContact({ ...contact, docId: docRef.id })
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
  }

  return useMutation({
    mutationFn,
    onSuccess
  })
}
