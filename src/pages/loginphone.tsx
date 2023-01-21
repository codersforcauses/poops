import { useState } from 'react'
import { NextPage } from 'next'

import EnterPasswordPanel from '@/components/Login/EnterPasswordPanel'
import EnterPhonePanel from '@/components/Login/EnterPhonePanel'
import LoginHeader from '@/components/Login/LoginHeader'
import { withPublic } from '@/components/PrivateRoute'

const Login: NextPage = () => {
  const pageTitle = 'Phone Login'
  const primaryMessage = 'Enter your phone number'

  const [phonenumber, setphonenumber] = useState<string>('')
  const [panel, setpanel] = useState('phone')

  function handlePhoneSubmit(phoneNumber: string) {
    setphonenumber(phoneNumber)
    setpanel('password')
  }

  function togglePanel() {
    setpanel('phone')
  }

  function renderPanel(state: string) {
    if (state === 'phone') {
      return (
        <LoginHeader
          pageTitle={pageTitle}
          primaryMessage={primaryMessage}
        >
          <EnterPhonePanel onClick={handlePhoneSubmit} />
        </LoginHeader>
      )
    } else {
      return (
        <LoginHeader
          pageTitle={pageTitle}
          primaryMessage={primaryMessage}
        >
          <EnterPasswordPanel
            phoneNumber={phonenumber}
            togglePanel={togglePanel}
          />
        </LoginHeader>
      )
    }
  }

  return <main className='h-full pb-0'>{renderPanel(panel)}</main>
}

export default withPublic(Login)
