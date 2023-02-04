import { useState } from 'react'
import {
  ConfirmationResult,
  RecaptchaVerifier,
  updateProfile,
  User
} from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { useAuth } from '@/context/Firebase/Auth/context'
import { Contact } from '@/types/types'
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier
    confirmationResult: ConfirmationResult
  }
}

import { useRouter } from 'next/router'

import SubmitButton from '@/components/UpdateDetails/SubmitButton'

type ContactItemProps = {
  contact: Contact
}

function UpdateDetailsPanel({ contact }: ContactItemProps) {
  const { currentUser } = useAuth()

  const [done, setDone] = useState(false)
  const [email, setEmail] = useState(contact?.email || '')
  const [displayName, setDisplayName] = useState(contact?.name || '')
  const [phoneNumber, setPhoneNumber] = useState(contact?.phone || '')
  const [err, setErr] = useState(false)
  const { auth } = useAuth()

  const router = useRouter()

  if (contact.email && contact.name && contact.phone) {
    router.replace('/')
  }

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
    await updateDoc(userDocRef, {
      'info.email': email,
      'info.name': displayName,
      'info.phone': phoneNumber
    })
  }
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement>,
    contact: Contact | null,
    currentUser: User
  ) => {
    e.preventDefault()

    try {
      setErr(false)
      if (phoneNumber) {
        if (!contact) {
          return
        }
        if (phoneNumber.length >= 9) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            'recaptcha-container',
            {
              size: 'invisible'
            },
            auth
          )
          handleDocUpdate(currentUser)
          updateProfile(currentUser, { displayName: displayName })
          setDone(true)
        }
      }
    } catch (error) {
      setErr(true)
    }
    window.location.reload()
  }

  return (
    <div className='w-4/5 space-y-5 md:w-2/5'>
      <div>
        {!displayName ? (
          <div>
            <div className='italic text-primary'>*Name required</div>
            <input
              className='h-10 w-full rounded-lg border border-primary bg-transparent pl-2 text-sm'
              value={displayName}
              onChange={(e) => editName(e)}
              name={displayName}
              placeholder='Name'
            />
          </div>
        ) : (
          <div>
            <p>Name</p>
            <input
              className='h-10 w-full rounded-lg border border-[#6b7280] bg-transparent pl-2 text-sm'
              value={displayName}
              onChange={(e) => editName(e)}
              name={displayName}
              placeholder='Name'
            />
          </div>
        )}
      </div>
      <div>
        {!email ? (
          <div>
            <div className='italic text-primary'>*Email required</div>
            <input
              className='h-10 w-full rounded-lg border border-primary bg-transparent pl-2 text-sm'
              value={email}
              onChange={(e) => editEmail(e)}
              name={email}
              placeholder='Email'
              type='email'
            />
          </div>
        ) : (
          <div>
            <p>Email</p>
            <input
              className='h-10 w-full rounded-lg border border-[#6b7280] bg-transparent pl-2 text-sm'
              value={email}
              onChange={(e) => editEmail(e)}
              name={email}
              placeholder='Email'
              type='email'
            />
          </div>
        )}
      </div>
      <div className='phone-input'>
        {!phoneNumber ? (
          <div>
            <div className='italic text-primary'>*Phone required</div>
            <input
              className='h-10 w-full rounded-lg border border-primary bg-transparent pl-2 text-sm'
              value={phoneNumber}
              onChange={(e) => editPhoneNumber(e)}
              name={phoneNumber}
              type='number'
              placeholder='Phone Number'
            />
          </div>
        ) : (
          <div>
            <p>Phone</p>
            <input
              className='h-10 w-full rounded-lg border border-[#6b7280] bg-transparent pl-2 text-sm'
              value={phoneNumber}
              onChange={(e) => editPhoneNumber(e)}
              name={phoneNumber}
              type='number'
              placeholder='Phone Number'
            />
          </div>
        )}
      </div>

      <div id='recaptcha-container'></div>
      <div>{err && <span>Something Went Wrong...</span>}</div>
      {!done && (
        <div className='text-center'>
          <SubmitButton
            onClick={(e) => handleSubmit(e, contact, currentUser)}
            buttonlabel='Submit'
            style='group h-12 rounded-full border-4 border-primary bg-primary text-white px-6 transition duration-300'
          />
        </div>
      )}
    </div>
  )
}

export default UpdateDetailsPanel
