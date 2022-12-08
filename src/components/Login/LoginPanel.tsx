import { useRouter } from 'next/router'
import {
  // faApple,
  faFacebookF,
  faGoogle,
  faMicrosoft,
  // faTwitter,
  // faYahoo
} from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Auth,
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  // TwitterAuthProvider,
  User
} from 'firebase/auth'

import LoginButton from '@/components/Login/LoginButton'
import { useAuth } from '@/context/Firebase/Auth/context'

export interface LoginPanelInterface {
  linkAccount: boolean // if true, will link the account to the logged in user, if false, will sign in with the provider
  displayGoogle: boolean
  displayFacebook: boolean
  displayMicrosoft: boolean
  displayPhone: boolean
}

const LoginPanel = ({
  linkAccount,
  displayGoogle,
  displayFacebook,
  displayMicrosoft,
  displayPhone
}: LoginPanelInterface) => {
  const { externalAuthSignIn, linkAuthProvider, currentUser, auth } = useAuth()

  const googleIcon = <FontAwesomeIcon icon={faGoogle} />
  const facebookIcon = <FontAwesomeIcon icon={faFacebookF} />
  const microsoftIcon = <FontAwesomeIcon icon={faMicrosoft} />
  const phoneIcon = <FontAwesomeIcon icon={faPhone} />

  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const microsoftProvider = new OAuthProvider('microsoft.com')
  const router = useRouter()

  function buttonString(providerString: string) {
    return !linkAccount
      ? 'Continue with ' + providerString
      : 'Link ' + providerString + ' Account'
  }

  function handleExternalAuth(
    auth: Auth,
    currentUser: User | null,
    provider: AuthProvider
  ) {
    if (!linkAccount) {
      externalAuthSignIn?.(auth, provider)
    } else {
      if (currentUser !== null) {
        linkAuthProvider?.(currentUser, provider)
      }
    }
  }

  return (
    <div className='m-auto grid h-1/3 w-1/2 max-w-xs justify-center space-y-4 p-5'>
      {/* Google Button */}
      <LoginButton
        onClick={() => handleExternalAuth(auth, currentUser, googleProvider)}
        icon={googleIcon}
        buttonlabel={buttonString('Google')}
        style='h-12 rounded-full border-4 border-t-googleblue border-r-googlegreen border-b-googleyellow border-l-googlered px-6 transition duration-300'
        display={displayGoogle}
      />

      {/* FaceBook Button */}
      <LoginButton
        onClick={() => handleExternalAuth(auth, currentUser, facebookProvider)}
        icon={facebookIcon}
        buttonlabel={buttonString('Facebook')}
        style='group h-12 rounded-full border-4 border-facebook px-6 transition duration-300'
        display={displayFacebook}
      />

      {/* Microsoft Button */}
      <LoginButton
        onClick={() => handleExternalAuth(auth, currentUser, microsoftProvider)}
        icon={microsoftIcon}
        buttonlabel={buttonString('Microsoft')}
        style='group h-12 rounded-full border-4 border-microsoftblue px-6 transition duration-300'
        display={displayMicrosoft}
      />

      {/* Phone Button //TODO*/}
      <LoginButton
        onClick={() => router.push('/loginphone')}
        icon={phoneIcon}
        buttonlabel={buttonString('Phone')}
        style='group h-12 rounded-full border-4 border-phonegreen px-6 transition duration-300'
        display={displayPhone}
      />
    </div>
  )
}

export default LoginPanel
