import { Dispatch, SetStateAction, useState } from 'react'
import { PencilIcon } from '@heroicons/react/outline'

import ContactForm from '@/components/Contact/contactform'
import ContactInfo from '@/components/Contact/contactinfo'
import Header from '@/components/Header'
import type { Contact } from '@/types/types'

type ContactProp = {
  contact: Contact
  setDisplayContact: Dispatch<SetStateAction<boolean>>
}

const ContactDetails = ({ contact, setDisplayContact }: ContactProp) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <Header pageTitle={contact.displayName} />
      <div className='m-auto flex h-14 max-w-md flex-row'>
        <div className='m-auto flex-1 text-center'>
          <button
            type='button'
            className='rounded bg-primary py-1 px-4 font-bold text-white hover:bg-dark-red'
            onClick={() => setDisplayContact(false)}
          >
            Back
          </button>
        </div>
        <div className='flex-1'></div>
        <div className='m-auto flex-1'>
          {!isEditing && (
            <PencilIcon
              className='m-auto flex h-7 w-7 cursor-pointer'
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
      {!isEditing ? (
        <ContactInfo contact={contact} image='' />
      ) : (
        <ContactForm contact={contact} image='' setIsEditing={setIsEditing} />
      )}
    </>
  )
}

export default ContactDetails
