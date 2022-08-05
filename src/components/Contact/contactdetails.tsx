import { useContext, useState } from 'react'
import { PencilIcon } from '@heroicons/react/outline'

import ContactForm from '@/components/Contact/contactform'
import ContactInfo from '@/components/Contact/contactinfo'
import Header from '@/components/Header'
import { ContactContext } from '@/pages/contact'

type ContactProp = {
  firestoreIndex: number
}

const ContactDetails = ({ firestoreIndex }: ContactProp) => {
  const { allContacts, setCreatingNewContact, setDisplayContactIndex } =
    useContext(ContactContext)
  const contacts = allContacts
  const isNewContact = firestoreIndex === -1
  const [isEditing, setIsEditing] = useState<boolean>(isNewContact)

  return (
    <>
      <Header
        pageTitle={
          firestoreIndex >= 0
            ? contacts[firestoreIndex].clientName
            : 'New Contact'
        }
      />
      <div className='m-auto flex h-14 max-w-md flex-row'>
        <div className='m-auto flex-1 text-center'>
          <button
            type='button'
            className='rounded bg-primary py-1 px-4 font-bold text-white hover:bg-dark-red'
            onClick={() => {
              setCreatingNewContact(false)
              setDisplayContactIndex(-1)
            }}
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
        <ContactInfo firestoreIndex={firestoreIndex} image='' />
      ) : (
        <ContactForm
          firestoreIndex={firestoreIndex}
          image=''
          setIsEditing={setIsEditing}
        />
      )}
    </>
  )
}

export default ContactDetails
