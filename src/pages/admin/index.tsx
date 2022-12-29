import { useCallback, useEffect, useState } from 'react'
import { doc, DocumentData, getDoc } from '@firebase/firestore'

import { db } from '@/components/Firebase/init'
import { useAuth } from '@/context/Firebase/Auth/context'
import setRole from '@/lib/temp/firebase/functions/setRole'

const Admin = () => {
  const { currentUser } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [userDoc, setUserDoc] = useState<DocumentData>()

  const getUserToken = useCallback(async () => {
    if (currentUser) {
      const token = await currentUser.getIdTokenResult(true)
      const result = token?.claims
      setIsAdmin(!!result?.admin)
      try {
        const userRef = doc(db, 'roles', currentUser?.email || '')
        const userDocSnapshot = await getDoc(userRef)
        const userDocData = userDocSnapshot.data()
        setUserDoc(userDocData)
      } catch (error) {
        console.log('Error getting document:', error)
      }
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      getUserToken()
    }
  }, [currentUser, getUserToken])

  const mod = async (adminAccess: boolean) => {
    try {
      if (currentUser?.email) {
        const reponse = await setRole({
          email: currentUser.email,
          roles: { admin: adminAccess }
        })
        const data = await reponse.json()
        console.log('Next API Response', data)
        getUserToken()
      }
    } catch (error) {
      console.log('Firebase Functions Error: ', error)
    }
  }

  return (
    <>
      <p>Admin page</p>
      <p>User: {currentUser?.displayName}</p>
      <p>Email: {currentUser?.email}</p>
      <p>Admin status: {isAdmin.toString()}</p>
      <p>User role firestore document: {JSON.stringify(userDoc)}</p>
      <button
        className='border border-black'
        type='button'
        onClick={() => mod(true)}
      >
        Mod me!
      </button>
      <button
        className='border border-black'
        type='button'
        onClick={async () => getUserToken()}
      >
        Refresh Token
      </button>

      <button
        className='border border-black'
        type='button'
        onClick={() => mod(false)}
      >
        Unmod me!
      </button>
    </>
  )
}

export default Admin
