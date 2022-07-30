import { useState } from 'react'
import { updateEmail, updateProfile, User } from 'firebase/auth'

import InputField from '@/components/InputField'

export interface UpdateDetailsPanelInterface {
  currentUser: User | null
}

function UpdateDetailsPanel({ currentUser }: UpdateDetailsPanelInterface) {
  const [email, setEmail] = useState(currentUser?.email || '')
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '')
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || '')

  // const displayName = currentUser?.displayName ?? undefined
  // const email = currentUser?.email ?? undefined
  // const phoneNumber = currentUser?.phoneNumber ?? undefined

  function submitChanges(currentUser: User | null) {
    if (!currentUser) {
      return
    }
    console.log('TEST')
    updateProfile(currentUser, {
      displayName: displayName
      // phoneNumber: phoneNumber
    })
    console.log(displayName)
    // updatePhoneNumber(currentUser, phoneNumber)
    // 'recaptcha-container' is the ID of an element in the DOM.
    // const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
    // const provider = new PhoneAuthProvider(auth);
    // const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier);
    // // Obtain the verificationCode from the user.
    // const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
    // await updatePhoneNumber(user, phoneCredential);
    if (email) {
      updateEmail(currentUser, email)
    }
  }

  return (
    <>
      <InputField type='displayName' placeHolder='Name' value={displayName} />
      <InputField type='email' placeHolder='Email' value={email} />
      <InputField
        type='phoneNumber'
        placeHolder='Phone Number'
        value={phoneNumber}
      />
      <button onClick={() => submitChanges(currentUser)}>SUBMIT</button>
    </>
  )
}
export default UpdateDetailsPanel
