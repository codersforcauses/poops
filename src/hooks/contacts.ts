import { db } from '@/components/Firebase/init'
import { useAuth } from '@/context/Firebase/Auth/context'
import { Contact } from '@/types/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  getDocs,
  setDoc
} from 'firebase/firestore'

export const useContacts = () => {
  const { currentUser } = useAuth()
  const queryFn = async () => {
    if (currentUser?.uid) {
      try {
        const contactsRef = collection(db, 'users', currentUser.uid, 'contacts')
        const contactsDocs = await getDocs(contactsRef)
        return contactsDocs.docs.map((doc) => doc.data() as Contact)
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

export const useCreateContact = () => {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()

  const mutationFn = async (newContact: Contact) => {
    try {
      if (currentUser?.uid) {
        const collectionRef = collection(
          db,
          'users',
          currentUser.uid,
          'contacts'
        )
        console.log(collectionRef)
        const docRef = await addDoc(collectionRef, newContact)
        console.log(docRef)
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
