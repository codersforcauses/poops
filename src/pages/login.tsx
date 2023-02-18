import Image from 'next/image'
import { useAtomValue } from 'jotai'

import { panelAtom } from '@/atoms/login'
import LoginPanel from '@/components/Login/Panels/LoginPanel'
import PhonePanel from '@/components/Login/Panels/PhonePanel'
import { withPublic } from '@/components/PrivateRoute'
import { useAuth } from '@/context/Firebase/Auth/context'

import { NextPageWithLayout } from './_app'

const Login: NextPageWithLayout = () => {
  const { logOut, currentUser } = useAuth()

  const panel = useAtomValue(panelAtom)

  return (
    <div className='h-screen w-screen overflow-y-scroll'>
      <title>Login</title>
      <div className='mx-auto max-w-sm flex-col content-center justify-center gap-4 p-4'>
        <Image
          src='/images/poops-logo-transparent.png'
          width={36}
          height={36}
          layout='responsive'
          objectPosition='center'
          alt='POOPS logo'
          className='rounded-full p-10'
        />

        <h1 className='p-3 text-center text-xl font-bold'>Sign In</h1>

        {panel !== 'phone' ? (
          <LoginPanel
            linkAccount={false}
            displayGoogle={true}
            displayFacebook={true}
            displayMicrosoft={true}
            displayPhone={true}
          />
        ) : (
          <PhonePanel />
        )}
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
