import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { doc, DocumentData, getDoc } from '@firebase/firestore'

import { db } from '@/components/Firebase/init'
import NavBar from '@/components/NavBar'
import Button from '@/components/UI/button'
import { useAuth } from '@/context/Firebase/Auth/context'
import mod from '@/lib/temp/firebase/functions/setRole'

const Admin = () => {
  const { currentUser, isAdmin, refreshUserToken } = useAuth()
  const [userDoc, setUserDoc] = useState<DocumentData>()

  const getUserDoc = useCallback(async () => {
    if (currentUser) {
      try {
        const userRef = doc(db, 'roles', currentUser.uid)
        const userDocSnapshot = await getDoc(userRef)
        const userDocData = userDocSnapshot.data()
        setUserDoc(userDocData)
      } catch (error) {
        console.log('Error getting document:', error)
        setUserDoc(error as DocumentData)
      }
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) getUserDoc()
  }, [currentUser, getUserDoc, isAdmin])

  const onMod = (adminAccess: boolean) => {
    if (currentUser) {
      mod(adminAccess, currentUser, refreshUserToken, getUserDoc)
    }
  }

  return (
    <>
      <h1>Admin page</h1>
      <p>User: {currentUser?.displayName}</p>
      <p>Email: {currentUser?.email}</p>
      <p>Admin status: {isAdmin.toString()}</p>
      <p>User role firestore document: {JSON.stringify(userDoc)}</p>
      <div>
        <Link href='/admin/incidents'>Go to /admin/incidents</Link>
      </div>

      <Button
        size='medium'
        intent='secondary'
        type='button'
        onClick={() => onMod(true)}
      >
        Mod me!
      </Button>
      <Button
        size='medium'
        intent='secondary'
        type='button'
        onClick={async () => refreshUserToken()}
      >
        Refresh Token
      </Button>

      <Button
        size='medium'
        intent='secondary'
        type='button'
        onClick={() => onMod(false)}
      >
        Unmod me!
      </Button>

      <NavBar />
    </>
  )
}

export default Admin
