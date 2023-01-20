import { useEffect, useState } from 'react'
import {
  ConfirmationResult,
  RecaptchaVerifier,
  updateProfile,
  User
} from 'firebase/auth'

import { useAuth } from '@/context/Firebase/Auth/context'
// import useUser from '@/hooks/user'
import { Contact } from '@/types/types'

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier
    confirmationResult: ConfirmationResult
  }
}

// export interface UpdateDetailsPanelInterface {
//   user: User | null
// }

type ContactItemProps = {
  contact: Contact
}

function UpdateDetailsPanel({ contact }: ContactItemProps) {
  const countryCode = '+61'
  // const { data: currentUser } = useUser()
  // TODO if currentUser:[newUser:true] {} else {}
  const [email, setEmail] = useState(contact.email || '')
  const [displayName, setDisplayName] = useState(contact.name || '')
  const [phoneNumber, setPhoneNumber] = useState(contact.phone || '')
  const [err, setErr] = useState(false)
  const { auth } = useAuth()
  console.log(contact)
  // useEffect(() => {
  //   setEmail(currentUser?.info.email || '')
  //   setDisplayName(currentUser?.info.name || '')
  //   setPhoneNumber(currentUser?.info.phone || '')
  // }, [])

  const editEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const editName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value)
  }
  const editPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, contact: Contact | null) => {
    e.preventDefault()

    try {
      setErr(false)
      console.log('into function')
      if (phoneNumber) {
        if (!contact) {
          return
        }
        if (phoneNumber.length >= 9) {
          try {
            window.recaptchaVerifier = new RecaptchaVerifier(
              'recaptcha-container',
              {
                size: 'invisible'
              },
              auth
            )
            console.log('Recaptcha resolved')
          } catch (error) {
            console.log(error)
          }
        }
      }
    } catch (error) {
      setErr(true)
    }
  }

  return (
    <div>
      <input
        className='h-10 w-full rounded-lg bg-transparent pl-2 text-sm'
        value={displayName}
        onChange={(e) => editName(e)}
        name={displayName}
        placeholder='Name'
      />

      <input
        className='h-10 w-full rounded-lg bg-transparent pl-2 text-sm'
        value={email}
        onChange={(e) => editEmail(e)}
        name={email}
        placeholder='Email'
      />

      <input
        className='h-10 w-full rounded-lg bg-transparent pl-2 text-sm'
        value={phoneNumber}
        onChange={(e) => editPhoneNumber(e)}
        name={phoneNumber}
        placeholder='Phone Number'
      />

      <div id='recaptcha-container'></div>
      <button onClick={(e) => handleSubmit(e, contact)}>Submit</button>
      {err && <span>Something Went Wrong...</span>}
    </div >
  )
}

export default UpdateDetailsPanel
