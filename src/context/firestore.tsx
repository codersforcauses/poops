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
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { useAuth } from '@/context/AuthContext'
import { Contact } from '@/types/types'

interface VisitProp {
  visit: string
  visitTime: Timestamp
}

interface UserDocProp {
  name: string
  time: Timestamp
  visit: VisitProp[]
  Contacts: Contact[]
}

interface FirestoreContextProp {
  userDoc: UserDocProp
}

const USERSDOC = 'TestUsers'

const defaultUserDoc: UserDocProp = {
  name: '',
  time: serverTimestamp() as Timestamp,
  visit: [],
  Contacts: []
}
//update functions as a context api
interface FirestoreContextProps {
  userDoc: UserDocProp
  updateVisit?: (userDoc: UserDocProp) => void
  updateContact?: (userDoc: UserDocProp) => void
}

const FirestoreContext = createContext<FirestoreContextProps>({
  userDoc: defaultUserDoc
})

export const FirestoreContextProvider = FirestoreContext.Provider

export const useFirestore = () => useContext(FirestoreContext)

//retreiving firestore data and setting the data to the local variable FireContextProps
const FirestoreProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth()
  const [userDoc, setUserDoc] = useState<UserDocProp>(defaultUserDoc)

  const retrieveData = useCallback(async () => {
    if (currentUser?.uid) {
      //try to get existing doc if the doc does not exist then create a new doc with uid as its ref
      try {
        const userDocSnap = await getDoc(doc(db, USERSDOC, currentUser.uid))
        if (userDocSnap.exists()) {
          const userDocData = userDocSnap.data() as UserDocProp
          setUserDoc(userDocData)
        } else {
          // doc.data() will be undefined in this case
          await setDoc(doc(db, USERSDOC, currentUser.uid), defaultUserDoc)
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
    async (user: UserDocProp) => {
      // setAchievementsCount((prev) => ({
      //   count: prev.count + newAchievementsEarned
      // }))
      try {
        if (currentUser?.uid) {
          const userDocRef = doc(db, 'users', currentUser.uid)
          await updateDoc(userDocRef, 'visits', user.visit)
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
    async (user: UserDocProp) => {
      // setAchievementsCount((prev) => ({
      //   count: prev.count + newAchievementsEarned
      // }))
      try {
        if (currentUser?.uid) {
          const userDocRef = doc(db, USERSDOC, currentUser.uid)
          await updateDoc(userDocRef, 'Contacts', user.Contacts)
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
