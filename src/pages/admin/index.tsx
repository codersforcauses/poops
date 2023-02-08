import { useCallback, useEffect, useState } from 'react'
import Router from 'next/router'
import { doc, DocumentData, getDoc } from '@firebase/firestore'

import { db } from '@/components/Firebase/init'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import Button from '@/components/UI/button'
import { useAuth } from '@/context/Firebase/Auth/context'

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

  return (
    <>
      <Header pageTitle='Admin' />
      <h1 className='m-3 flex-1 text-center text-2xl'>Admin</h1>
      <p>User: {currentUser?.displayName}</p>
      <p>Email: {currentUser?.email}</p>
      <p>Admin status: {isAdmin.toString()}</p>
      <p>User role firestore document: {JSON.stringify(userDoc)}</p>
      <Button
        size='medium'
        intent='secondary'
        type='button'
        onClick={async () => refreshUserToken()}
      >
        Refresh Token
      </Button>

      <div className='m-2'>
        <Button
          size='medium'
          intent='primary'
          type='button'
          onClick={() => Router.push('/admin/incidents')}
        >
          View Incidents
        </Button>
        <Button
          size='medium'
          intent='primary'
          type='button'
          onClick={() => Router.push('/admin/roles')}
        >
          View Roles
        </Button>
      </div>

      <NavBar />
    </>
  )
}

export default Admin
