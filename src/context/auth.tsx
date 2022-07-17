import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  Auth,
  AuthProvider,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User
} from 'firebase/auth'

import { auth } from '../components/Firebase/init'

interface FirebaseContextProps {
  auth: Auth
  getGoogleResults?: (auth: Auth) => void
  externalAuthSignIn?: (auth: Auth, provider: AuthProvider) => void
  logOut?: () => void
  currentUser?: User | null
}
//set auth and current user as a context api to be called by other funcs
const authContext = createContext<FirebaseContextProps>({
  auth: auth,
  currentUser: null
})

export const useAuth = () => useContext(authContext)

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
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
  //get the auth results when logging in with google
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
    externalAuthSignIn,
    logOut,
    currentUser
  }

  return (
    <authContext.Provider value={value}>
      {!loading && children}
    </authContext.Provider>
  )
}
