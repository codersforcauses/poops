import { ReactNode, useEffect, useState } from 'react'
import {
  Auth,
  AuthProvider,
  getRedirectResult,
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
        // console.log(result)
        getRedirectResult(auth).then(function (result) {
          // console.log(result)
          if (result) {
            const user = result.user
            if (
              user.email == null ||
              user.displayName == null ||
              user.phoneNumber == null
            ) {
              // console.log('User is not completely signed in')
              // TODO redirect user to complete sign up
            }
          }
        })
        return result
      })
      .catch((error) => {
        // console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRr")
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
