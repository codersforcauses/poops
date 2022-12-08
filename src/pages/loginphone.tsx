import { useState } from 'react'
import { NextPage } from 'next'

import EnterPasswordPanel from '@/components/Login/EnterPasswordPanel'
import EnterPhonePanel from '@/components/Login/EnterPhonePanel'
import LoginHeader from '@/components/Login/LoginHeader'
import { withPublic } from '@/components/PrivateRoute'

const Login: NextPage = () => {
  const pageTitle = 'Phone Login'
  const primaryMessage = 'Enter your phone number'
  const secondaryMessage = 'Please enter your phone number'

  const [panel, setpanel] = useState('phone')

  function handlePhoneSubmit() {
    setpanel('password')
  }

  return (
    <main>
      <LoginHeader
        pageTitle={pageTitle}
        primaryMessage={primaryMessage}
        secondaryMessage={secondaryMessage}
      >
        {panel == 'phone' ? (
          <EnterPhonePanel togglePanel={handlePhoneSubmit} />
        ) : (
          <EnterPasswordPanel />
        )}
      </LoginHeader>
    </main>
  )
}

export default withPublic(Login)
