import { useState } from 'react'
import {
  ConfirmationResult,
  linkWithCredential,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updatePhoneNumber,
  updateProfile,
  User
} from 'firebase/auth'

import { useAuth } from '@/context/Firebase/Auth/context'

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier
    confirmationResult: ConfirmationResult
  }
}

export interface UpdateDetailsPanelInterface {
  currentUser: User | null
}

function UpdateDetailsPanel({ currentUser }: UpdateDetailsPanelInterface) {
  const countryCode = '+61'
  const { auth } = useAuth()
  const [email, setEmail] = useState(currentUser?.email || '')
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '')
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || '')
  // const [OTP, setOTP] = useState('')
  // const [expandForm, setExpandForm] = useState(false)
  // const displayName = currentUser?.displayName ?? undefined
  // const email = currentUser?.email ?? undefined
  // const phoneNumber = currentUser?.phoneNumber ?? undefined

  function editEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }
  function editName(event: React.ChangeEvent<HTMLInputElement>) {
    setDisplayName(event.target.value)
  }
  function editPhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(event.target.value)
  }
  // function editOTPCode(event: React.ChangeEvent<HTMLInputElement>) {
  //   setOTP(event.target.value)
  // }
  
  

  function submitChanges(currentUser: User | null) {
    console.log('into function')
    if (phoneNumber) {
      if (!currentUser) {
        return
      }
      console.log('TEST')
      if (displayName) {
        updateProfile(currentUser, {
          displayName: displayName
        })
      }
    }
    console.log(email)

    // ###
    // if (phoneNumber && credential) {
    //   updatePhoneNumber(currentUser, credential)
    // }

    console.log(phoneNumber)
    // ####
    // if (phoneNumber && typeof window !== 'undefined') {
    if (phoneNumber.length >= 9) {
      // const provider = new PhoneAuthProvider(auth)
      // const phoneCredential = new PhoneAuthCredential
      console.log('into phone part')
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

      // // TODO fix window.confirmationResult not working in typescript
      // // TODO test phone number not receiving any OTP code.
      // const appVerifier = window.recaptchaVerifier
      // signInWithPhoneNumber(auth, countryCode + phoneNumber, appVerifier)
      //   .then((confirmationResult) => {
      //     window.confirmationResult = confirmationResult
      //     console.log(confirmationResult)
      //     setExpandForm(true)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    }
  }

  // function submitOTP(currentUser: User | null) {
  //   const credential = PhoneAuthProvider.credential(
  //     window.confirmationResult.verificationId,
  //     OTP
  //   )
  //   if (currentUser != null) {
  //     try {
  //       console.log(currentUser.providerData[0].providerId)
  //       linkWithCredential(currentUser, credential)
  //       updatePhoneNumber(currentUser, credential)
  //       console.log(currentUser?.phoneNumber)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }

  return (
    <>
      <h1>providerId: {currentUser?.providerId}</h1>
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
      {/* <>
        <div>
          <label htmlFor='otpInput' className='form-label'>
            OTP
          </label>
          <input
            type='number'
            className='form-control'
            id='otpInput'
            onChange={(e) => editOTPCode(e)}
          />
          <div id='otpHelp' className='form-text'>
            Please enter the one time pin sent to your phone
          </div>
          <button>Submit OTP</button>
        </div>
      </> */}
    </>
  )
}
export default UpdateDetailsPanel
