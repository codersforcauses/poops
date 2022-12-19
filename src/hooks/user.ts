import { db } from '@/components/Firebase/init'
import { useAuth } from '@/context/Firebase/Auth/context'
import { Contact, UserData } from '@/types/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { User } from 'firebase/auth'
import {
    doc,
    FirestoreError,
    getDoc,
    setDoc,
    updateDoc
} from 'firebase/firestore'

const newUser = (currentUser: User): Contact => {
    return {
        id: currentUser.uid,
        clientName: currentUser.displayName ?? '',
        email: currentUser.email ?? '',
        phone: currentUser.phoneNumber ?? '',
        streetAddress: '',
        region: [],
        pets: '',
        tags: ['Volunteer']
    }
}

const useUser = () => {
    const { currentUser } = useAuth()
    const queryClient = useQueryClient()

    const getUser = () => {
        const queryFn = async () => {
            if (currentUser?.uid) {
                //try to get existing doc if the doc does not exist then create a new doc with uid as its ref
                try {
                    const userDocSnap = await getDoc(doc(db, 'users', currentUser.uid))

                    if (!userDocSnap.exists()) {
                        // doc.data() will be undefined in this case
                        await setDoc(
                            doc(db, 'users', currentUser.uid),
                            newUser(currentUser)
                        )
                    }

                    return userDocSnap.data() as UserData
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

    const updateUser = () => {
        const mutationFn = async (info: Contact) => {
            try {
                if (currentUser?.uid) {
                    const userDocRef = doc(db, 'users', currentUser.uid)
                    await updateDoc(userDocRef, 'info', info)
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
        }

        return useMutation({
            mutationFn,
            onSuccess
        })
    }

    return { getUser, updateUser }
}

export default useUser
