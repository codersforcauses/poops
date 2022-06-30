import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { User } from 'firebase/auth'

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

  // function signup(email: string, password: string) { // CURRENTLY NOT IN USE, COULD BE USED IF SCOPE CHANGES
  //   return createUserWithEmailAndPassword(auth, email, password)
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const value = {
    currentUser
    // signup,
  }

  return (
    <authContext.Provider value={{ value }}>
      {!loading && children}
    </authContext.Provider>
  )
}
