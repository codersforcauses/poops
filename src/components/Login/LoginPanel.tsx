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
import Logo from '@/components/UI/logoSvg'
import { useAuth } from '@/context/Firebase/Auth/context'

export interface LoginPanelInterface {
  linkAccount: boolean // if true, will link the account to the logged in user, if false, will sign in with the provider
  displayGoogle: boolean
  displayFacebook: boolean
  displayMicrosoft: boolean
}

const LoginPanel = ({
  linkAccount,
  displayGoogle,
  displayFacebook,
  displayMicrosoft
}: LoginPanelInterface) => {
  const { externalAuthSignIn, linkAuthProvider, currentUser, auth } = useAuth()

  const googleIcon = <Logo name='Google' viewBox='0 0 24 24' />
  const facebookIcon = <Logo name='Facebook' viewBox='0 0 24 24' />
  const microsoftIcon = <Logo name='Microsoft' viewBox='0 0 24 24' />

  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const microsoftProvider = new OAuthProvider('microsoft.com')

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
    </div>
  )
}

export default LoginPanel
