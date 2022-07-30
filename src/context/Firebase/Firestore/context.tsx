import { createContext, useContext } from 'react'

import { UserData } from '@/types/types'

//set the default data for new logins in firestore
export const defaultUserDoc: UserData = {
  clientName: '',
  visits: [],
  contacts: []
}
//update functions as a context api
export interface FirestoreContextProps {
  userDoc: UserData
  updateVisit?: (userDoc: UserData) => void
  updateContact?: (userDoc: UserData) => void
}

const FirestoreContext = createContext<FirestoreContextProps>({
  userDoc: defaultUserDoc
})

export const FirestoreContextProvider = FirestoreContext.Provider

export const useFirestore = () => useContext(FirestoreContext)
