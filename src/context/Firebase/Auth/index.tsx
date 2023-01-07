import { ReactNode, useCallback, useEffect, useState } from 'react'
import { FirebaseError } from 'firebase/app'
import {
  Auth,
  AuthErrorCodes,
  AuthProvider,
  getRedirectResult,
  GoogleAuthProvider,
  linkWithRedirect,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User
} from 'firebase/auth'

import { auth } from '@/components/Firebase/init'
import {
  AuthContext,
  FirebaseContextProps
} from '@/context/Firebase/Auth/context'

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const externalAuthSignIn = async (auth: Auth, provider: AuthProvider) => {
    try {
      const result = await signInWithRedirect(auth, provider)
      return result
    } catch (error) {
      return error
    }
  }

  const linkAuthProvider = async (
    currentUser: User,
    provider: AuthProvider
  ) => {
    try {
      const result = await linkWithRedirect(currentUser, provider)
      return result
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case AuthErrorCodes.PROVIDER_ALREADY_LINKED:
            console.log('auth/provider-already-linked')
          // TODO Send error alert to user
        }
      }
      return error
    }
  } // TODO Success message for user?

  const getGoogleResults = async (auth: Auth) => {
    try {
      const result = await getRedirectResult(auth)
      if (result !== null) {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        if (credential !== null) {
          // const token = credential.accessToken;
        }
        return result.user
      }
    } catch (error) {
      return error
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }
  //to log out curremt user
  const logOut = async () => {
    try {
      const result = await signOut(auth)
      return result
    } catch (error) {
      return error
    }
  }
  //set the current user to the user retrieved from the login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const refreshUserToken = useCallback(async () => {
    if (currentUser) {
      const token = await currentUser.getIdTokenResult(true)
      setIsAdmin(token.claims.admin ?? false)
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      refreshUserToken()
    }
  }, [currentUser, refreshUserToken])

  const value: FirebaseContextProps = {
    auth,
    getGoogleResults,
    linkAuthProvider,
    externalAuthSignIn,
    logOut,
    currentUser,
    isAdmin,
    refreshUserToken
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
