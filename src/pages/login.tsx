import { NextPage } from 'next'
import Image from 'next/image'

import LoginPanel from '@/components/Login/LoginPanel'

const Login: NextPage = () => {
  return (
    <>
      <main>
        <title>Login</title>
        <div className='animate-text bg-gradient-to-b from-zinc-300 via-zinc-200 to-zinc-50 '>
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
            displayGoogle={true}
            displayFacebook={true}
            displayTwitter={true}
            displayMicrosoft={true}
            displayYahoo={false}
            displayApple={false}
          />
        </div>
      </main>
    </>
  )
}

export default Login
// export default withPublic(Login)
