/* eslint-disable no-console */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import {
  doc,
  FirestoreError,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'

import { MESSAGES } from '@/components/Firebase/errors'
import { db } from '@/components/Firebase/init'
import { useAuth } from '@/context/auth'

import { UserData } from '../types/types'

interface FirestoreContextProp {
  userDoc: UserData
}

const defaultUserDoc: UserData = {
  displayName: '',
  visits: [],
  contacts: []
}

interface FirestoreContextProps {
  userDoc: UserData
  updateVisit?: (userDoc: UserData) => void
  updateContact?: (userDoc: UserData) => void
}

const FirestoreContext = createContext<FirestoreContextProps>({
  userDoc: defaultUserDoc
})

export const FirestoreContextProvider = FirestoreContext.Provider

export const useFirestore = () => useContext(FirestoreContext)

const FirestoreProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth()
  const [userDoc, setUserDoc] = useState<UserData>(defaultUserDoc)

  const retrieveData = useCallback(async () => {
    if (currentUser?.uid) {
      try {
        const userDocSnap = await getDoc(doc(db, 'users', currentUser.uid))
        if (userDocSnap.exists()) {
          const userDocData = userDocSnap.data() as UserData
          setUserDoc(userDocData)
        } else {
          // doc.data() will be undefined in this case
          console.log(MESSAGES.NO_USER_DOCUMENT)
          await setDoc(doc(db, 'users', currentUser.uid), defaultUserDoc)
        }
      } catch (err: unknown) {
        //#region  //*=========== For logging ===========
        if (err instanceof FirestoreError) {
          console.error(err.message)
        } else console.error(err)
        //#endregion  //*======== For logging ===========
      }
    }
  }, [currentUser])

  useEffect(() => {
    retrieveData()
  }, [retrieveData])

  const updateVisit = useCallback(
    async (user: UserData) => {
      // setAchievementsCount((prev) => ({
      //   count: prev.count + newAchievementsEarned
      // }))
      try {
        if (currentUser?.uid) {
          const userDocRef = doc(db, 'users', currentUser.uid)
          await updateDoc(userDocRef, 'Visits', user.visits)
        }
      } catch (err: unknown) {
        //#region  //*=========== For logging ===========
        if (err instanceof FirestoreError) {
          console.error(err.message)
        } else console.error(err)
        //#endregion  //*======== For logging ===========
      }
    },
    [currentUser]
  )
  const updateContact = useCallback(
    async (user: UserData) => {
      // setAchievementsCount((prev) => ({
      //   count: prev.count + newAchievementsEarned
      // }))
      try {
        if (currentUser?.uid) {
          const userDocRef = doc(db, 'users', currentUser.uid)
          await updateDoc(userDocRef, 'Contacts', user.contacts)
        }
      } catch (err: unknown) {
        //#region  //*=========== For logging ===========
        if (err instanceof FirestoreError) {
          console.error(err.message)
        } else console.error(err)
        //#endregion  //*======== For logging ===========
      }
    },
    [currentUser]
  )

  const value: FirestoreContextProp = useMemo(
    () => ({
      userDoc: userDoc,
      updateVisit: updateVisit,
      updateContact: updateContact
    }),
    [userDoc, updateVisit, updateContact]
  )

  return (
    <FirestoreContextProvider value={value}>
      {children}
    </FirestoreContextProvider>
  )
}

export default FirestoreProvider
