import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { User as AuthUser } from 'firebase/auth'
import {
  doc,
  FirestoreError,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useAuth } from '@/context/Firebase/Auth/context'
import { canDelete } from '@/hooks/utils'
import { Contact, User } from '@/types/types'

const newUser = (currentUser: AuthUser): User => {
  return {
    info: {
      name: currentUser.displayName ?? '',
      email: currentUser.email ?? '',
      phone: currentUser.phoneNumber ?? '',
      streetAddress: '',
      region: [],
      pets: '',
      tags: ['Volunteer'],
      desc: '',
      notes: ''
    },
    stats: {
      numHours: 0,
      numVisits: 0,
      commutedDist: 0,
      walkedDist: 0
    }
  }
}

export const useUser = () => {
  const { currentUser } = useAuth()

  const queryFn = async (): Promise<User | undefined> => {
    if (currentUser?.uid) {
      //try to get existing doc if the doc does not exist then create a new doc with uid as its ref
      try {
        let userDocSnap = await getDoc(doc(db, 'users', currentUser.uid))

        if (!userDocSnap.exists()) {
          // doc.data() will be undefined in this case
          await setDoc(doc(db, 'users', currentUser.uid), newUser(currentUser))
          userDocSnap = await getDoc(doc(db, 'users', currentUser.uid))
        }

        const userData = userDocSnap.data() as User
        return { ...userData, info: { ...userData.info, docId: 'USER' } }
      } catch (err: unknown) {
        //#region  //*=========== For logging ===========
        if (err instanceof FirestoreError) {
          console.error(err.message)
        } else console.error(err)
        //#endregion  //*======== For logging ===========
      }
    }
  }

  return useQuery(['user'], queryFn)
}

export const useMutateUser = () => {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const mutationFn = async (user: Contact | { docId?: string }) => {
    try {
      if (currentUser?.uid) {
        const { docId: userId, ...userMut } = user

        if (canDelete(userMut, userId)) {
          return console.error('Cannot Delete User')
        }

        const userDocRef = doc(db, 'users', currentUser.uid)
        await updateDoc(userDocRef, 'info', userMut)
      }
    } catch (err: unknown) {
      //#region  //*=========== For logging ===========
      if (err instanceof FirestoreError) {
        console.error(err.message)
      } else console.error(err)
      //#endregion  //*======== For logging ===========
    }
  }

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['user'] })
    setAlert({
      variant: AlertVariant.info,
      title: 'Success!',
      text: 'Updated user information',
      position: 'bottom',
      showFor: 1000
    })
  }

  const onError = () => {
    setAlert({
      variant: AlertVariant.critical,
      title: 'Error!',
      text: 'Could not update user information',
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

export default useUser
