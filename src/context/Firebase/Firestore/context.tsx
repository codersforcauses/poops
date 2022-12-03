import { createContext, useContext } from 'react'
import { User } from 'firebase/auth'

import { UserData } from '@/types/types'

//set the default data for new logins in firestore
export const emptyUserDoc: UserData = {
  info: {
    id: '',
    clientName: '',
    email: '',
    phone: ''
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
    phone: currentUser.phoneNumber ?? ''
  },
  visits: [],
  contacts: []
})
//update functions as a context api
export interface FirestoreContextProps {
  userDoc: UserData
  updateVisit?: (userDoc: UserData) => void
  updateContact?: (userDoc: UserData) => void
}

const FirestoreContext = createContext<FirestoreContextProps>({
  userDoc: emptyUserDoc
})

export const FirestoreContextProvider = FirestoreContext.Provider

export const useFirestore = () => useContext(FirestoreContext)
