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
  TwitterAuthProvider
} from 'firebase/auth'

import LoginButton from './LoginButton'
import { auth } from '../../components/Firebase/init'
import { useAuth } from '../../context/AuthContext'

export interface LoginPanelInterface {
  displayGoogle: boolean
  displayFacebook: boolean
  displayTwitter: boolean
  displayMicrosoft: boolean
  displayYahoo: boolean
  displayApple: boolean
}

const LoginPanel = (props: LoginPanelInterface) => {
  const { externalAuthSignIn } = useAuth()

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

  function handleExternalAuth(auth: Auth, provider: AuthProvider) {
    externalAuthSignIn?.(auth, provider)
  }

  return (
    <>
      <div className='m-auto grid h-1/3 w-1/2 max-w-xs justify-center space-y-4 p-5'>
        {/* Google Button */}
        <LoginButton
          handler={() => handleExternalAuth(auth, googleProvider)}
          icon={googleIcon}
          buttonlabel='Continue with Google'
          style='h-12 rounded-full border-4 border-t-googleblue border-r-googlegreen border-b-googleyellow border-l-googlered px-6 transition duration-300'
          display={props.displayGoogle}
        />

        {/* FaceBook Button */}
        <LoginButton
          handler={() => handleExternalAuth(auth, facebookProvider)}
          icon={facebookIcon}
          buttonlabel='Continue with Facebook'
          style='group h-12 rounded-full border-4 border-facebook px-6 transition duration-300'
          display={props.displayFacebook}
        />

        {/* Twitter Button */}
        <LoginButton
          handler={() => handleExternalAuth(auth, twitterProvider)}
          icon={twitterIcon}
          buttonlabel='Continue with Twitter'
          style='group h-12 rounded-full border-4 border-twitter px-6 transition duration-300'
          display={props.displayTwitter}
        />

        {/* Microsoft Button */}
        <LoginButton
          handler={() => handleExternalAuth(auth, microsoftProvider)}
          icon={microsoftIcon}
          buttonlabel='Continue with Microsoft'
          style='group h-12 rounded-full border-4 border-microsoftblue px-6 transition duration-300'
          display={props.displayMicrosoft}
        />

        {/* Apple Button */}
        <LoginButton
          handler={() => undefined}
          icon={appleIcon}
          buttonlabel='Continue with Apple'
          style='group h-12 rounded-full border-4 border-applegrey px-6 transition duration-300'
          display={props.displayApple}
        />

        {/* Yahoo Button */}
        <LoginButton
          handler={() => undefined}
          icon={yahooIcon}
          buttonlabel='Continue with Yahoo'
          style='group h-12 rounded-full border-4 border-yahoopurple px-6 transition duration-300'
          display={props.displayYahoo}
        />
      </div>
    </>
  )
}

export default LoginPanel
