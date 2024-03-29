import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { User as AuthUser } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useAuth } from '@/context/Firebase/Auth/context'
import { canDelete } from '@/hooks/utils'
import { Contact, User } from '@/types/types'
import { userSchema } from '@/types/zod/schema'

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
  const router = useRouter()

  const queryFn = async (): Promise<User | undefined> => {
    if (currentUser?.uid) {
      //try to get existing doc if the doc does not exist then create a new doc with uid as its ref
      let userDocSnap = await getDoc(doc(db, 'users', currentUser.uid))

      if (!userDocSnap.exists()) {
        // doc.data() will be undefined in this case
        await setDoc(doc(db, 'users', currentUser.uid), newUser(currentUser))
        userDocSnap = await getDoc(doc(db, 'users', currentUser.uid))
      }

      const rawData = userDocSnap.data() as User
      if (!(rawData.info.email && rawData.info.phone && rawData.info.name)) {
        router.replace('/signupDetails')
      }

      /*
       * this throws and kills the hook if the data is not valid
       * (i.e. when signing in with phone, there is no email)
       * so we need to redirect beforehand
       */
      const userData = userSchema.parse(rawData)
      return { ...userData, info: { ...userData.info, docId: 'USER' } } as User
    }
  }

  return useQuery(['user'], queryFn)
}

export const useMutateUser = () => {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const { setAlert } = useAlert()

  const mutationFn = async (user: Contact | { docId?: string }) => {
    if (currentUser?.uid) {
      const { docId: userId, ...userMut } = user

      if (canDelete(userMut, userId)) {
        return console.error('Cannot Delete User')
      }

      const userDocRef = doc(db, 'users', currentUser.uid)
      await updateDoc(userDocRef, 'info', userMut)
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
