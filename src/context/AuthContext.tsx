import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  Auth,
  FacebookAuthProvider,
  getRedirectResult,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  TwitterAuthProvider,
  User
} from 'firebase/auth'

import { auth } from '../components/Firebase/init'

interface FirebaseContextProps {
  auth: Auth
  googleSignIn?: (auth: Auth) => void
  facebookSignIn?: (auth: Auth) => void
  twitterSignIn?: (auth: Auth) => void
  microsoftSignIn?: (auth: Auth) => void
  getGoogleResults?: (auth: Auth) => void
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

  function googleSignIn(auth: Auth) {
    const googleProvider = new GoogleAuthProvider()
    signInWithRedirect(auth, googleProvider) // Not working in chrome incognito?, but signInWithPopup does
      .then((result) => {
        return result
      })
      .catch((error) => {
        return error
      })
  }

  function facebookSignIn(auth: Auth) {
    const facebookProvider = new FacebookAuthProvider()
    signInWithRedirect(auth, facebookProvider)
      .then((result) => {
        return result
      })
      .catch((error) => {
        return error
      })
  }

  function twitterSignIn(auth: Auth) {
    const twitterProvider = new TwitterAuthProvider()
    signInWithRedirect(auth, twitterProvider)
      .then((result) => {
        return result
      })
      .catch((error) => {
        return error
      })
  }

  function microsoftSignIn(auth: Auth) {
    const microsoftProvider = new OAuthProvider('microsoft.com')
    signInWithRedirect(auth, microsoftProvider)
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
    googleSignIn,
    facebookSignIn,
    twitterSignIn,
    microsoftSignIn,
    getGoogleResults,
    logOut,
    currentUser
  }

  return (
    <authContext.Provider value={value}>
      {!loading && children}
    </authContext.Provider>
  )
}
