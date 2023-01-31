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
        className='fixed top-0 left-0 pt-2 pl-2 text-black'
        onClick={logOut}
      >
        <span className='text-3xl'>&larr;</span>
      </button>

      <div className='text-center'>
        <div className='m-auto max-w-sm pb-2'>
          <Image
            src='/images/poops-logo-transparent.png'
            width={36}
            height={36}
            layout='responsive'
            alt='POOPS logo'
            className='rounded-full'
          />
        </div>

        <div className='pb-2 text-xl font-bold'>Welcome, New User!</div>
      </div>
      <UpdateDetailsPanel contact={currentUser.info} />
    </div>
  )
}

export default withProtected(SignupDetails)
