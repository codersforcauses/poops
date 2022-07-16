import React, { createContext, useContext, useEffect, useState } from 'react'
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

import { auth } from '../components/Firebase/init'

interface FirebaseContextProps {
  auth: Auth
  getGoogleResults?: (auth: Auth) => void
  linkAuthProvider?: (currentUser: User, provider: AuthProvider) => void
  externalAuthSignIn?: (auth: Auth, provider: AuthProvider) => void
  logOut?: () => void
  currentUser?: User | null
}

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

  function linkAuthProvider(currentUser: User, provider: AuthProvider) {
    // const googleProvider = new GoogleAuthProvider()
    // console.log("test")
    // console.log(currentUser)
    // console.log(provider)
    linkWithRedirect(currentUser, provider)
      .then((result) => {
        return result
      })
      .catch((error) => {
        return error
      })
  }

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

  function logOut() {
    signOut(auth)
      .then((result) => {
        return result
      })
      .catch((error) => {
        return error
      })
  }

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
    <authContext.Provider value={value}>
      {!loading && children}
    </authContext.Provider>
  )
}
