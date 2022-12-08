import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { User } from 'firebase/auth'

import { Contact, UserData } from '@/types/types'

//set the default data for new logins in firestore
export const emptyUserDoc: UserData = {
  info: {
    id: '',
    clientName: '',
    email: '',
    phone: '',
    streetAddress: '',
    region: [],
    tags: []
  },
  visits: [],
  contacts: []
}

//create new user
// TODO: clientName, email, and phone should be set via a user creation wizard on new user creation
export const newUser = (currentUser: User): UserData => ({
  info: {
    id: currentUser.uid,
    clientName: currentUser.displayName ?? '',
    email: currentUser.email ?? '',
    phone: currentUser.phoneNumber ?? '',
    streetAddress: '',
    region: [],
    tags: []
  },
  visits: [],
  contacts: []
})
//update functions as a context api
export interface FirestoreContextProps {
  userDoc: UserData
  updateUserInfo?: (userDoc: UserData) => void
  updateVisit?: (userDoc: UserData) => void
  updateContact?: (userDoc: UserData) => void
}

const FirestoreContext = createContext<FirestoreContextProps>({
  userDoc: emptyUserDoc
})

export const FirestoreContextProvider = FirestoreContext.Provider

export const useFirestore = () => useContext(FirestoreContext)
