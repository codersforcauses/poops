import {
  faApple,
  faFacebookF,
  faGoogle,
  faMicrosoft,
  faTwitter,
  faYahoo
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Auth,
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  User
} from 'firebase/auth'

import LoginButton from '@/components/Login/LoginButton'

// import { auth } from '../../components/Firebase/init'
import { useAuth } from '../../context/AuthContext'

export interface LoginPanelInterface {
  linkAccount: boolean // if true, will link the account to the logged in user, if false, will sign in with the provider
  displayGoogle: boolean
  displayFacebook: boolean
  displayTwitter: boolean
  displayMicrosoft: boolean
  displayYahoo: boolean
  displayApple: boolean
}

const LoginPanel = (props: LoginPanelInterface) => {
  const { externalAuthSignIn, linkAuthProvider, currentUser, auth } = useAuth()

  const googleIcon = <FontAwesomeIcon icon={faGoogle} />
  const facebookIcon = <FontAwesomeIcon icon={faFacebookF} />
  const twitterIcon = <FontAwesomeIcon icon={faTwitter} />
  const appleIcon = <FontAwesomeIcon icon={faApple} />
  const microsoftIcon = <FontAwesomeIcon icon={faMicrosoft} />
  const yahooIcon = <FontAwesomeIcon icon={faYahoo} />

  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const twitterProvider = new TwitterAuthProvider()
  const microsoftProvider = new OAuthProvider('microsoft.com')

  function buttonString(providerString: string) {
    let buttonString = ''
    if (!props.linkAccount) {
      buttonString = 'Continue with ' + providerString
    } else {
      buttonString = 'Link ' + providerString + ' Account'
    }
    return buttonString
  }

  function handleButtonPress(
    auth: Auth,
    currentUser: User | null,
    provider: AuthProvider
  ) {
    if (!props.linkAccount) {
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
        handler={() => handleButtonPress(auth, currentUser, googleProvider)}
        icon={googleIcon}
        buttonlabel={buttonString('Google')}
        style='h-12 rounded-full border-4 border-t-googleblue border-r-googlegreen border-b-googleyellow border-l-googlered px-6 transition duration-300'
        display={props.displayGoogle}
      />

      {/* FaceBook Button */}
      <LoginButton
        handler={() => handleButtonPress(auth, currentUser, facebookProvider)}
        icon={facebookIcon}
        buttonlabel={buttonString('Facebook')}
        style='group h-12 rounded-full border-4 border-facebook px-6 transition duration-300'
        display={props.displayFacebook}
      />

      {/* Twitter Button */}
      <LoginButton
        handler={() => handleButtonPress(auth, currentUser, twitterProvider)}
        icon={twitterIcon}
        buttonlabel={buttonString('Twitter')}
        style='group h-12 rounded-full border-4 border-twitter px-6 transition duration-300'
        display={props.displayTwitter}
      />

      {/* Microsoft Button */}
      <LoginButton
        handler={() => handleButtonPress(auth, currentUser, microsoftProvider)}
        icon={microsoftIcon}
        buttonlabel={buttonString('Microsoft')}
        style='group h-12 rounded-full border-4 border-microsoftblue px-6 transition duration-300'
        display={props.displayMicrosoft}
      />

      {/* Apple Button */}
      <LoginButton
        handler={() => undefined}
        icon={appleIcon}
        buttonlabel={buttonString('Apple')}
        style='group h-12 rounded-full border-4 border-applegrey px-6 transition duration-300'
        display={props.displayApple}
      />

      {/* Yahoo Button */}
      <LoginButton
        handler={() => undefined}
        icon={yahooIcon}
        buttonlabel={buttonString('Yahoo')}
        style='group h-12 rounded-full border-4 border-yahoopurple px-6 transition duration-300'
        display={props.displayYahoo}
      />
    </div>
  )
}

export default LoginPanel
