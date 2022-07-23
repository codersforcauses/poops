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
import { useAuth } from '@/context/Auth/context'

import { UserData } from '../../types/types'

interface FirestoreContextProp {
  userDoc: UserData
}

//set the default data for new logins in firestore
const defaultUserDoc: UserData = {
  displayName: '',
  visits: [],
  contacts: []
}
//update functions as a context api
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

//retreiving firestore data and setting the data to the local variable FireContextProps
const FirestoreProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth()
  const [userDoc, setUserDoc] = useState<UserData>(defaultUserDoc)

  const retrieveData = useCallback(async () => {
    if (currentUser?.uid) {
      //try to get existing doc if the doc does not exist then create a new doc with uid as its ref
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

  //updates the whole visit and contact array in the doc
  /*
    this functions gets what is in the curent array in local storage
    then ovewrites the whole array in firestore with the current local array

    delete, add and update works using the same function. done through adding/removing 
    from array and editing the values in the array.
  */
  const updateVisit = useCallback(
    async (user: UserData) => {
      // setAchievementsCount((prev) => ({
      //   count: prev.count + newAchievementsEarned
      // }))
      try {
        if (currentUser?.uid) {
          const userDocRef = doc(db, 'users', currentUser.uid)
          await updateDoc(userDocRef, 'visits', user.visits)
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
          await updateDoc(userDocRef, 'contacts', user.contacts)
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

  //changes the default value to the data retreived and saved in state
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
