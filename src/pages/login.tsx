import Image from 'next/image'

import LoginPanel from '@/components/Login/LoginPanel'
import { withPublic } from '@/components/PrivateRoute'
import { useAuth } from '@/context/Firebase/Auth/context'

import { NextPageWithLayout } from './_app'

const Login: NextPageWithLayout = () => {
  const { logOut, currentUser } = useAuth()

  return (
    <div className='h-screen w-screen'>
      <title>Login</title>
      <div className='animate-text bg-white'>
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

        <div className='p-3 text-center text-xl font-bold'>Sign In</div>

        <div className='text-x1 text-center font-sans'>
          Use any one of your profiles
        </div>

        <LoginPanel
          linkAccount={false}
          displayGoogle={true}
          displayFacebook={true}
          displayMicrosoft={true}
          displayPhone={true}
        />
      </div>
      {/*! used for testing} */}
      <br />
      <br />
      {currentUser && (
        <div className='text-center'>
          <p>{currentUser?.displayName}</p>
          <button onClick={() => logOut?.()}>logout</button>
        </div>
      )}
    </div>
  )
}

export default withPublic(Login)
