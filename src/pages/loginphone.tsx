import { NextPage } from 'next'

import EnterPhonePanel from '@/components/Login/EnterPhonePanel'
import LoginHeader from '@/components/Login/LoginHeader'
import { withPublic } from '@/components/PrivateRoute'

const Login: NextPage = () => {
  const pageTitle = 'Phone Login'
  const primaryMessage = 'Enter your phone number'
  const secondaryMessage = 'Please enter your phone number'

  return (
    <main>
      <LoginHeader
        pageTitle={pageTitle}
        primaryMessage={primaryMessage}
        secondaryMessage={secondaryMessage}
      >
        <EnterPhonePanel />
      </LoginHeader>
    </main>
  )
}

export default withPublic(Login)
