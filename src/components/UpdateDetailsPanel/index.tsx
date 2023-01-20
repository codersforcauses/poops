import { useEffect, useState } from 'react'
import {
  ConfirmationResult,
  RecaptchaVerifier,
  updateProfile,
  User
} from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
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
  const { currentUser } = useAuth()
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
  if (currentUser === null) {
    return null
  }
  const editEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const editName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value)
  }
  const editPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
  }

  const handleDocUpdate = async (currentUser: User) => {
    const userDocRef = doc(db, 'users', currentUser.uid)
    await updateDoc(userDocRef, { "info.email": email, "info.name": displayName, "info.phone": phoneNumber })
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, contact: Contact | null, currentUser: User) => {
    e.preventDefault()

    try {
      setErr(false) // debug only
      // console.log('into function')
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
            // console.log('Recaptcha resolved')
          } catch (error) {
            // console.log(error)
          }
          handleDocUpdate(currentUser)
        }
      }
    } catch (error) {
      setErr(true) // debug only
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
        type="email"
      />

      <input
        className='h-10 w-full rounded-lg bg-transparent pl-2 text-sm'
        value={phoneNumber}
        onChange={(e) => editPhoneNumber(e)}
        name={phoneNumber}
        placeholder='Phone Number'
      />


      <div id='recaptcha-container'></div>
      <button disabled={!(displayName && email && phoneNumber)} onClick={(e) => handleSubmit(e, contact, currentUser)}>Submit</button>
      <div>
        {!(displayName && email && phoneNumber) && <span>Please finish your missing details</span>}
        {err && <span>Something Went Wrong...</span>}
      </div>

    </div >
  )
}

export default UpdateDetailsPanel
