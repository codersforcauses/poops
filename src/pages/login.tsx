import { NextPage } from 'next'

import LoginHeader from '@/components/Login/LoginHeader'
import LoginPanel from '@/components/Login/LoginPanel'
import { withPublic } from '@/components/PrivateRoute'
import { useAuth } from '@/context/Firebase/Auth/context'

const Login: NextPage = () => {
  const { logOut, currentUser } = useAuth()

  const pageTitle = 'Login'
  const primaryMessage = 'Sign In'
  const secondaryMessage = 'Use any one of your profiles'

  return (
    <main>
      <LoginHeader
        pageTitle={pageTitle}
        primaryMessage={primaryMessage}
        secondaryMessage={secondaryMessage}
      >
        <LoginPanel
          linkAccount={false}
          displayGoogle={true}
          displayFacebook={true}
          displayMicrosoft={true}
          displayPhone={true}
        />
      </LoginHeader>
      {/* //! used for testing} */}
      <br />
      <br />
      {currentUser && (
        <div className='text-center'>
          <p>{currentUser?.displayName}</p>
          <button onClick={() => logOut?.()}>logout</button>
        </div>
      )}
    </main>
  )
}

export default withPublic(Login)
