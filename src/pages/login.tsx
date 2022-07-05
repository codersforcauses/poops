import { NextPage } from 'next'
import Image from 'next/image'
import {
  faApple,
  faFacebookF,
  faGoogle,
  faMicrosoft,
  faTwitter,
  faYahoo
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Auth } from 'firebase/auth'

import { auth } from '../components/Firebase/init'
import { useAuth } from '../context/AuthContext'

const Login: NextPage = () => {
  const { googleSignIn } = useAuth()

  const googleIcon = <FontAwesomeIcon icon={faGoogle} />
  const facebookIcon = <FontAwesomeIcon icon={faFacebookF} />
  // const githubIcon = <FontAwesomeIcon icon={faGithub} />
  const twitterIcon = <FontAwesomeIcon icon={faTwitter} />
  const appleIcon = <FontAwesomeIcon icon={faApple} />
  const microsoftIcon = <FontAwesomeIcon icon={faMicrosoft} />
  const yahooIcon = <FontAwesomeIcon icon={faYahoo} />

  function handleGoogle(auth: Auth) {
    googleSignIn?.(auth)
  }

  return (
    <>
      <main>
        <title>Login</title>
        <div className='animate-text bg-gradient-to-b from-zinc-300 via-zinc-200 to-zinc-50'>
          <div className='m-auto max-w-sm p-10'>
            <Image
              src='/images/poops-logo.jpg'
              width={36}
              height={36}
              layout='responsive'
              alt='POOPS logo'
              className='rounded-full'
            ></Image>
          </div>

          <div className='text-center text-xl font-bold'>Sign In</div>

          <div className='m-auto grid h-1/3 w-1/2 max-w-xs justify-center space-y-4 p-5'>
            {/* Google Button */}
            <button
              className='h-12 rounded-full border-4 border-t-googleblue border-r-googlegreen border-b-googleyellow border-l-googlered px-6 transition duration-300 '
              onClick={() => handleGoogle(auth)}
            >
              <div className='relative flex items-center space-x-4'>
                <div className='w-5'>{googleIcon}</div>
                <span className='text-gray-700 block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
                  Continue with Google
                </span>
              </div>
            </button>

            {/* TODO: check types and finish refactoring */}
            {/* <LoginButton handlerFunction={handleGoogle(auth)} icon='googleIcon' buttonlabel='Continue with Google' /> */}

            {/* FaceBook Button */}
            <button className='group h-12 rounded-full border-4 border-facebook px-6 transition duration-300'>
              <div className='relative flex items-center space-x-4'>
                <div className='w-5'>{facebookIcon}</div>
                <span className='text-gray-700 block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
                  Continue with Facebook
                </span>
              </div>
            </button>
            {/* Twitter Button */}
            <button className='group h-12 rounded-full border-4 border-twitter px-6 transition duration-300'>
              <div className='relative flex items-center space-x-4'>
                <div className='w-5'>{twitterIcon}</div>
                <span className='text-gray-700 block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
                  Continue with Twitter
                </span>
              </div>
            </button>
            {/* Apple Button */}
            <button className='group h-12 rounded-full border-4 border-applegrey px-6 transition duration-300'>
              <div className='relative flex items-center space-x-4'>
                <div className='w-5'>{appleIcon}</div>
                <span className='text-gray-700 block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
                  Continue with Apple
                </span>
              </div>
            </button>
            {/* Microsoft Button */}
            <button className='group h-12 rounded-full border-4 border-microsoftblue px-6 transition duration-300'>
              <div className='relative flex items-center space-x-4'>
                <div className='w-5'>{microsoftIcon}</div>
                <span className='text-gray-700 block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
                  Continue with Microsoft
                </span>
              </div>
            </button>
            {/* Yahoo Button */}
            <button className='group h-12 rounded-full border-4 border-yahoopurple px-6 transition duration-300'>
              <div className='relative flex items-center space-x-4'>
                <div className='w-5'>{yahooIcon}</div>
                <span className='text-gray-700 block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
                  Continue with Yahoo
                </span>
              </div>
            </button>
            {/* <button onClick={logOut}>logout test</button> */}
          </div>
        </div>
      </main>
    </>
  )
}

export default Login
