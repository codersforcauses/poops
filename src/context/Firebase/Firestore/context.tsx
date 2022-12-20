import { createContext, useContext } from 'react'
import { User as AuthUser } from 'firebase/auth'

import { User } from '@/types/types'

//set the default data for new logins in firestore
export const emptyUserDoc: User = {
  info: {
    id: '',
    clientName: '',
    email: '',
    phone: '',
    streetAddress: '',
    region: [],
    pets: '',
    tags: []
  },
  visits: [],
}

//create new user
// TODO: clientName, email, and phone should be set via a user creation wizard on new user creation
export const newUser = (currentUser: AuthUser): User => ({
  info: {
    id: currentUser.uid,
    clientName: currentUser.displayName ?? '',
    email: currentUser.email ?? '',
    phone: currentUser.phoneNumber ?? '',
    streetAddress: '',
    region: [],
    pets: '',
    tags: ['Volunteer']
  },
  visits: []
})
//update functions as a context api
export interface FirestoreContextProps {
  userDoc: User
  updateVisit?: (userDoc: User) => void
}

const FirestoreContext = createContext<FirestoreContextProps>({
  userDoc: emptyUserDoc
})

export const FirestoreContextProvider = FirestoreContext.Provider

export const useFirestore = () => useContext(FirestoreContext)
