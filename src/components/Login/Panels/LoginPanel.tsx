import {
  Auth,
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  User
} from 'firebase/auth'
import { useSetAtom } from 'jotai'

import { panelAtom } from '@/atoms/login'
import LoginButton from '@/components/Login/LoginButton'
import Logo from '@/components/UI/logoSvg'
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
  const setPanel = useSetAtom(panelAtom)

  const googleIcon = <Logo name='Google' viewBox='0 0 24 24' />
  const facebookIcon = <Logo name='Facebook' viewBox='0 0 24 24' />
  const microsoftIcon = <Logo name='Microsoft' viewBox='0 0 24 24' />
  const phoneIcon = <Logo name='Phone' viewBox='0 0 24 24' />

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
        style='h-12 rounded-full border-4 border-t-[#4285F4] border-r-[#34A853] border-b-[#FBBC05] border-l-[#EA4335] px-6 transition duration-300'
        display={displayGoogle}
      />

      {/* Facebook Button */}
      <LoginButton
        onClick={() => handleExternalAuth(auth, currentUser, facebookProvider)}
        icon={facebookIcon}
        buttonlabel={buttonString('Facebook')}
        style='group h-12 rounded-full border-4 border-[#4267B2] px-6 transition duration-300'
        display={displayFacebook}
      />

      {/* Microsoft Button */}
      <LoginButton
        onClick={() => handleExternalAuth(auth, currentUser, microsoftProvider)}
        icon={microsoftIcon}
        buttonlabel={buttonString('Microsoft')}
        style='group h-12 rounded-full border-4 border-[#00A4EF] px-6 transition duration-300'
        display={displayMicrosoft}
      />

      {/* Phone Button */}
      <LoginButton
        onClick={() => setPanel('phone')}
        icon={phoneIcon}
        buttonlabel={buttonString('Phone')}
        style='group h-12 rounded-full border-4 border-[#68CC6A] px-6 transition duration-300'
        display={displayPhone}
      />
    </div>
  )
}

export default LoginPanel
