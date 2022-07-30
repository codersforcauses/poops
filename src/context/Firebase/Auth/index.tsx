import { ReactNode, useEffect, useState } from 'react'
import {
  Auth,
  AuthProvider,
  getRedirectResult,
  GoogleAuthProvider,
  linkWithRedirect,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User
} from 'firebase/auth'

import {
  AuthContext,
  FirebaseContextProps
} from '@/context/Firebase/Auth/context'

import { auth } from '../../../components/Firebase/init'

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  function externalAuthSignIn(auth: Auth, provider: AuthProvider) {
    signInWithRedirect(auth, provider)
      .then((result) => {
        return result
      })
      .catch((error) => {
        return error
      })
  }

  function linkAuthProvider(currentUser: User, provider: AuthProvider) {
    linkWithRedirect(currentUser, provider)
      .then((result) => {
        return result
      })
      .catch((error) => {
        if (error.code === 'auth/provider-already-linked') {
          // console.log("auth/provider-already-linked")
          // TODO Send error alert to user
        }
        return error
      })
  } // TODO Success message for user?

  function getGoogleResults(auth: Auth) {
    getRedirectResult(auth)
      .then((result) => {
        if (result !== null) {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          if (credential !== null) {
            // const token = credential.accessToken;
          }
          const user = result.user
          return user
        }
      })
      .catch((error) => {
        return error
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      })
  }
  //to log out curremt user
  function logOut() {
    signOut(auth)
      .then((result) => {
        return result
      })
      .catch((error) => {
        return error
      })
  }
  //set the current user to the user retrieved from the login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const value: FirebaseContextProps = {
    auth,
    getGoogleResults,
    linkAuthProvider,
    externalAuthSignIn,
    logOut,
    currentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
