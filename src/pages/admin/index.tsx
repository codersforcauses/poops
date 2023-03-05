import { ReactElement, useCallback, useEffect, useState } from 'react'
import Router from 'next/router'
import { doc, DocumentData, getDoc } from '@firebase/firestore'

import { db } from '@/components/Firebase/init'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { withAdmin } from '@/components/PrivateRoute'
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
        console.error('Error getting document:', error)
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
      <div className='main-style'>
        <div className='flex h-full w-screen flex-col justify-center text-center'>
          <div className='mb-4'>
            <h1 className='flex-1 text-2xl'>Admin</h1>
          </div>
          <div>
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
                className='m-1'
              >
                View Incidents
              </Button>
              <Button
                size='medium'
                intent='primary'
                type='button'
                onClick={() => Router.push('/admin/concerns')}
                className='m-1'
              >
                View Concerns
              </Button>
              <Button
                size='medium'
                intent='primary'
                type='button'
                onClick={() => Router.push('/admin/stats')}
                className='m-1'
              >
                View Stats
              </Button>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  )
}

const AdminWithProtected = withAdmin(Admin)

AdminWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Admin'>{page}</Layout>
)

export default AdminWithProtected
