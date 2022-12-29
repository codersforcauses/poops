import { useCallback, useEffect, useState } from 'react'

import { useAuth } from '@/context/Firebase/Auth/context'
import setRole from '@/lib/temp/firebase/functions/setRole'

const Admin = () => {
  const { currentUser } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  const getUserToken = useCallback(async () => {
    if (currentUser) {
      const token = await currentUser.getIdTokenResult(true)
      const result = token?.claims
      console.log(result)
      if (result?.admin) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
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
