import { useEffect, useState } from 'react'
import {
  ConfirmationResult,
  linkWithCredential,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateEmail,
  updatePhoneNumber,
  updateProfile,
  User
} from 'firebase/auth'

import { useAuth } from '@/context/Firebase/Auth/context'
import useUser from '@/hooks/user'

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier
    confirmationResult: ConfirmationResult
  }
}

export interface UpdateDetailsPanelInterface {
  user: User | null
}


function UpdateDetailsPanel({ user }: UpdateDetailsPanelInterface) {
  const countryCode = '+61'
  const { data: currentUser } = useUser()
  console.log(currentUser)
  const [email, setEmail] = useState(currentUser?.info.email || '')
  const [displayName, setDisplayName] = useState(currentUser?.info.name || '')
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.info.phone || '')
  const [phoneErr, setPhoneErr] = useState(false)
  const [displayNameErr, setDisplayNameErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [err, setErr] = useState(false)
  const { auth } = useAuth()

  console.log(currentUser)

  // useEffect(() => {
  //   setEmail(currentUser?.email || '')
  //   setDisplayName(currentUser?.displayName || '')
  //   setPhoneNumber(currentUser?.phoneNumber || '')
  // }, [])

  const editEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    console.log(event.target.value)
  }
  const editName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value)
    console.log(event.target.value)
  }
  const editPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
    console.log(event.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, user: User | null) => {
    e.preventDefault()

    try {
      setErr(false)
      console.log('into function')
      if (phoneNumber) {
        setPhoneErr(false)
        if (!currentUser) {
          return
        }
        if (email) {
          setEmailErr(false)
        } else {
          setEmailErr(true)
        }
        if (displayName) {
          setDisplayNameErr(false)
        } else {
          setDisplayNameErr(true)
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
        } else {
          setPhoneErr(true)
        }
        if (user != null) {
          updateProfile(user, {
            displayName: displayName
          })
        }

      } else {
        setPhoneErr(true)
      }
    } catch (error) {
      setErr(true)
      console.log('here')
    }
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, user)}>
        <input
          className='h-10 w-full rounded-lg bg-transparent pl-2 text-sm'
          value={displayName}
          onChange={(e) => editName(e)}
          name={displayName}
          placeholder='Name'
        />
        <>
          {displayName && <span>please type in name</span>}
          {displayNameErr && <span>please type in correct name</span>}
        </>
        <input
          className='h-10 w-full rounded-lg bg-transparent pl-2 text-sm'
          value={email}
          onChange={(e) => editEmail(e)}
          name={email}
          placeholder='Email'
        />
        <>
          {email && <span>please type in email</span>}
          {emailErr && <span>please type in correct email</span>}
        </>
        <input
          className='h-10 w-full rounded-lg bg-transparent pl-2 text-sm'
          value={phoneNumber}
          onChange={(e) => editPhoneNumber(e)}
          name={phoneNumber}
          placeholder='Phone Number'
        />
        <>
          {phoneNumber && <span>please type in phone number</span>}
          {phoneErr && <span>please type in correct phone number</span>}
        </>
        <div id='recaptcha-container'></div>
        <button>Submit</button>
        {err && <span>Something Went Wrong...</span>}
      </form>
    </div >
  )
}

export default UpdateDetailsPanel
