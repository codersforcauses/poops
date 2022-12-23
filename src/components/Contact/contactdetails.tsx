import { useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'

import ContactForm from '@/components/Contact/contactform'
import ContactInfo from '@/components/Contact/contactinfo'
import Header from '@/components/Header'
import { useContact } from '@/context/ContactContext/context'
import { useFirestore } from '@/context/Firebase/Firestore/context'

import Button from '../UI/button'

type ContactProp = {
  firestoreIndex: number | null
}

const ContactDetails = ({ firestoreIndex }: ContactProp) => {
  const { userDoc } = useFirestore()
  const { allContacts, setCreatingNewContact, setDisplayContactIndex } =
    useContact()
  const isNewContact = firestoreIndex === null
  const [isEditing, setIsEditing] = useState<boolean>(isNewContact)

  return (
    <>
      <Header
        pageTitle={
          firestoreIndex
            ? firestoreIndex === -1
              ? userDoc.info.clientName
              : allContacts[firestoreIndex as number].clientName
            : 'New Contact'
        }
      />
      <div className='m-auto flex h-14 w-full flex-row'>
        <div className='m-auto flex-1 text-center'>
          <Button
            type='button'
            size='medium'
            onClick={() => {
              setCreatingNewContact(false)
              setDisplayContactIndex(null)
            }}
          >
            Back
          </Button>
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
        <ContactInfo firestoreIndex={firestoreIndex as number} image='' />
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
