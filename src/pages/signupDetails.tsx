import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'

import { withProtected } from '@/components/PrivateRoute'
import UpdateDetailsForm from '@/components/UpdateDetails/UpdateDetailsForm'
import { useAuth } from '@/context/Firebase/Auth/context'
import useUser from '@/hooks/user'

const SignupDetails: NextPage = () => {
  const router = useRouter()
  const { logOut } = useAuth()
  const { data: user } = useUser()

  if (user?.info.name && user?.info.email && user?.info.phone) {
    router.replace('/')
  }

  return (
    <div className='flex h-screen w-screen animate-text flex-col items-center justify-center bg-gradient-to-b from-zinc-200 via-zinc-100 to-white'>
      <button
        className='fixed top-0 left-0 pt-2 pl-2 text-black'
        onClick={logOut}
      >
        <span className='text-3xl'>&larr;</span>
      </button>

      <div>
        <div className='m-auto max-w-sm pb-4'>
          <Image
            src='/images/poops-logo-transparent.png'
            width={36}
            height={36}
            layout='responsive'
            alt='POOPS logo'
            className='rounded-full'
          />
        </div>
        <div className='text-center text-xl font-bold'>Welcome, New User!</div>
        <UpdateDetailsForm />
      </div>
    </div>
  )
}

export default withProtected(SignupDetails)
