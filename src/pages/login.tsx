import { NextPage } from 'next'
import Image from 'next/image'
import { Auth } from 'firebase/auth'

import { auth } from '../components/Firebase/init'
import { useAuth } from '../context/AuthContext'

const Login: NextPage = () => {
  // const { auth } = useAuth();
  const { googleSignIn } = useAuth()
  // googleSignIn
  // const { value } = useAuth()
  // const googleSignIn = value.googleSignIn
  // value.googleSignIn(auth)
  // console.log(value)

  function handleSubmit(auth: Auth) {
    // e.preventDefault()
    // console.log('test1')
    // getGoogleResults(auth)
    googleSignIn?.(auth)
  }

  return (
    <>
      <main>
        <title>Login</title>
        <div className='m-auto max-w-md p-10'>
          <Image
            src='/images/poops-logo.jpg'
            width={40}
            height={40}
            layout='responsive'
            alt='POOPS logo'
          ></Image>
        </div>

        <div className='text-center text-xl font-bold'>Sign In</div>

        <div className='m-auto grid h-1/3 w-3/4 max-w-sm space-y-4 p-5'>
          <button
            className='border-gray-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 group h-12 rounded-full border-2 
 px-6 transition duration-300'
            onClick={() => handleSubmit(auth)}
          >
            <div className='relative flex items-center justify-center space-x-4'>
              {/* <Image
                src='https://tailus.io/sources/blocks/social/preview/images/google.svg'
                width={5}
                height={5}
                className='absolute left-0 w-5'
                alt='google logo'
              /> */}
              <span className='text-gray-700 group-hover:text-blue-600 block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
                Continue with Google
              </span>
            </div>
          </button>
          <button
            className='border-gray-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 group h-12 rounded-full border-2 
 px-6 transition duration-300'
          >
            <div className='relative flex items-center justify-center space-x-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                className='text-gray-700 absolute left-0 w-5'
                viewBox='0 0 16 16'
              >
                <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
              </svg>
              <span className='text-gray-700 group-hover:text-blue-600 block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
                Continue with Github
              </span>
            </div>
          </button>
          <button
            className='border-gray-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 group h-12 rounded-full border-2 
                                     px-6 transition duration-300'
          >
            <div className='relative flex items-center justify-center space-x-4'>
              {/* <Image
                src='https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg'
                width={5}
                height={5}
                className='absolute left-0 w-5'
                alt='Facebook logo'
              /> */}
              <span className='text-gray-700 group-hover:text-blue-600 block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
                Continue with Facebook
              </span>
            </div>
          </button>
        </div>
      </main>
    </>
  )
}

export default Login
