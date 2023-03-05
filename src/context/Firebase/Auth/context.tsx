import { createContext, useContext } from 'react'
import { Auth, AuthProvider, User } from 'firebase/auth'

import { auth } from '@/components/Firebase/init'

export interface FirebaseContextProps {
  auth: Auth
  getGoogleResults?: (auth: Auth) => void
  linkAuthProvider?: (currentUser: User, provider: AuthProvider) => void
  externalAuthSignIn?: (auth: Auth, provider: AuthProvider) => void
  logOut?: () => void
  userLoading: boolean
  currentUser: User | null
  tokenLoading: boolean
  isAdmin: boolean
  refreshUserToken: () => Promise<void>
}
//set auth and current user as a context api to be called by other funcs
export const AuthContext = createContext<FirebaseContextProps>({
  auth: auth,
  userLoading: true,
  currentUser: null,
  tokenLoading: true,
  isAdmin: false,
  refreshUserToken: async () => undefined
})

export const useAuth = () => useContext(AuthContext)
