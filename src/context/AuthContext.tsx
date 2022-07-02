import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  Auth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User
} from 'firebase/auth'

import { auth } from '../components/Firebase/init'

const authContext = createContext({})

export const useAuth = () => useContext(authContext)

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  function googleSignIn(auth: Auth) {
    // TODO add error checking
    const googleProvider = new GoogleAuthProvider()
    // return signInWithRedirect(auth, googleProvider);
    signInWithRedirect(auth, googleProvider)
      .then((result) => {
        // console.log(result);
        return result
      })
      .catch((error) => {
        // console.log(error);
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
        // console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      })
  }

  function logOut() {
    // TODO add error checking
    // return signOut(auth);
    signOut(auth)
      .then((result) => {
        // console.log(result)
        return result
      })
      .catch((error) => {
        // console.log(error)
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

  const value = {
    currentUser,
    googleSignIn,
    getGoogleResults,
    logOut
  }

  return (
    <authContext.Provider value={{ value }}>
      {!loading && children}
    </authContext.Provider>
  )
}
