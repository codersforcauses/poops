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
    <>
      <div className='animate-text bg-gradient-to-b from-zinc-200 via-zinc-100 to-white '>
        <button onClick={logOut}>LOG OUT</button>

        <div className='m-auto max-w-sm p-10'>
          <Image
            src='/images/poops-logo-transparent.png'
            width={36}
            height={36}
            layout='responsive'
            alt='POOPS logo'
            className='rounded-full'
          ></Image>
        </div>
        <div className='p-3 text-center text-xl font-bold'>Welcome, New User!</div>
        <div className='text-x1 text-center font-sans'>
          Please fill in your details
        </div>
        <div className='m-auto grid h-1/3 w-1/2 max-w-xs justify-center space-y-4 p-5'>
          <UpdateDetailsPanel contact={currentUser.info} />
        </div>
      </div>
    </>
  )
}

export default withProtected(SignupDetails)
