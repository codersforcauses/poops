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

import LoginButton from '@/components/Login/LoginButton'
import { withPublic } from '@/components/PrivateRoute'

import { auth } from '../components/Firebase/init'
import { useAuth } from '../context/AuthContext'

const Login: NextPage = () => {
  const { googleSignIn } = useAuth()

  const googleIcon = <FontAwesomeIcon icon={faGoogle} />
  const facebookIcon = <FontAwesomeIcon icon={faFacebookF} />
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

          <div className='m-auto grid h-1/3 w-1/2 max-w-xs justify-center space-y-4 p-5'>
            {/* Google Button */}
            <LoginButton
              handler={() => handleGoogle(auth)}
              icon={googleIcon}
              buttonlabel='Continue with Google'
              style='h-12 rounded-full border-4 border-t-googleblue border-r-googlegreen border-b-googleyellow border-l-googlered px-6 transition duration-300'
            />

            {/* FaceBook Button */}
            <LoginButton
              handler={() => undefined}
              icon={facebookIcon}
              buttonlabel='Continue with Facebook'
              style='group h-12 rounded-full border-4 border-facebook px-6 transition duration-300'
            />

            {/* Twitter Button */}
            <LoginButton
              handler={() => undefined}
              icon={twitterIcon}
              buttonlabel='Continue with Twitter'
              style='group h-12 rounded-full border-4 border-twitter px-6 transition duration-300'
            />

            {/* Apple Button */}
            <LoginButton
              handler={() => undefined}
              icon={appleIcon}
              buttonlabel='Continue with Apple'
              style='group h-12 rounded-full border-4 border-applegrey px-6 transition duration-300'
            />

            {/* Microsoft Button */}
            <LoginButton
              handler={() => undefined}
              icon={microsoftIcon}
              buttonlabel='Continue with Microsoft'
              style='group h-12 rounded-full border-4 border-microsoftblue px-6 transition duration-300'
            />

            {/* Yahoo Button */}
            <LoginButton
              handler={() => undefined}
              icon={yahooIcon}
              buttonlabel='Continue with Yahoo'
              style='group h-12 rounded-full border-4 border-yahoopurple px-6 transition duration-300'
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default withPublic(Login)
