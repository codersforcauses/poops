import { NextPage } from 'next'
import Image from 'next/image'

import NavBar from '@/components/NavBar'
// import LoginPanel from '@/components/Login/LoginPanel'
import { withProtected } from '@/components/PrivateRoute'
import UpdateDetailsPanel from '@/components/UpdateDetails/UpdateDetailsPanel'
import { useAuth } from '@/context/Firebase/Auth/context'
import useUser from '@/hooks/user'
import type { Contact } from '@/types/types'

const SignupDetails: NextPage = () => {
  const { logOut } = useAuth()
  const { data: currentUser } = useUser()
  if (currentUser === undefined) return null

  return (
    <div className='flex h-screen w-screen animate-text flex-col items-center justify-center bg-gradient-to-b from-zinc-200 via-zinc-100 to-white'>
      <button
        className='fixed top-0 left-0 mb-4 h-12 rounded-full border-4 border-primary bg-primary px-4 text-white'
        onClick={logOut}
      >
        LOG OUT
      </button>
      <div className='text-center'>
        <div className='pb-2 text-xl font-bold'>Welcome, New User!</div>
      </div>
      <UpdateDetailsPanel contact={currentUser.info} />
    </div>
  )
}

export default withProtected(SignupDetails)
