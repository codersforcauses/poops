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
  arrayRemove,
  arrayUnion,
  doc,
  FirestoreError,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
  writeBatch
} from 'firebase/firestore'

import { MESSAGES } from '@/components/Firebase/errors'
import { db } from '@/components/Firebase/init'
import { useAuth } from '@/context/auth'

interface VisitProp {
  visit: string
  visitTime: Timestamp
}

interface ContactProp {
  contact: string
  contactTime: Timestamp
}

interface UserDocProp {
  name: string
  time: Timestamp
  visit: VisitProp[]
  contact: ContactProp[]
}

interface FirestoreContextProp {
  userDoc: UserDocProp
}

const defaultUserDoc: UserDocProp = {
  name: '',
  time: serverTimestamp() as Timestamp,
  visit: [],
  contact: []
}

interface FirestoreContextProps {
  userDoc: UserDocProp
  updateVisit?: (oldVisit: VisitProp, newVisit: VisitProp) => void
  updateContact?: (oldContact: ContactProp, newContact: ContactProp) => void
}

const FirestoreContext = createContext<FirestoreContextProps>({
  userDoc: defaultUserDoc
})

export const FirestoreContextProvider = FirestoreContext.Provider

export const useFirestore = () => useContext(FirestoreContext)

const FirestoreProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth()
  const [userDoc, setUserDoc] = useState<UserDocProp>(defaultUserDoc)

  const retrieveData = useCallback(async () => {
    if (currentUser?.uid) {
      try {
        const userDocSnap = await getDoc(doc(db, 'users', currentUser.uid))
        if (userDocSnap.exists()) {
          const userDocData = userDocSnap.data() as UserDocProp
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
    async (oldVisit: VisitProp, newVisit: VisitProp) => {
      // setAchievementsCount((prev) => ({
      //   count: prev.count + newAchievementsEarned
      // }))
      try {
        if (currentUser?.uid) {
          const userDocRef = doc(db, 'users', currentUser.uid)
          const batch = writeBatch(db)
          batch.update(userDocRef, {
            visit: arrayRemove(oldVisit)
          })
          batch.update(userDocRef, {
            visit: arrayUnion({
              ...newVisit,
              visitTime: serverTimestamp() as Timestamp
            })
          })
          await batch.commit()
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
    async (oldContact: ContactProp, newContact: ContactProp) => {
      // setAchievementsCount((prev) => ({
      //   count: prev.count + newAchievementsEarned
      // }))
      try {
        if (currentUser?.uid) {
          const userDocRef = doc(db, 'users', currentUser.uid)
          const batch = writeBatch(db)
          batch.update(userDocRef, { visit: arrayRemove(oldContact) })
          batch.update(userDocRef, {
            visit: arrayUnion({
              ...newContact,
              contactTime: serverTimestamp() as Timestamp
            })
          })
          await batch.commit()
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
