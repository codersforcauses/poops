import { PencilIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'

import { currentContactAtom, isEditingAtom } from '@/atoms/contacts'
import ContactForm from '@/components/Contact/contactform'
import ContactInfo from '@/components/Contact/contactinfo'
import Header from '@/components/Header'

import Button from '../UI/button'

const ContactDetails = () => {
  const [currentContact, setCurrentContact] = useAtom(currentContactAtom)
  const [isEditing, setIsEditing] = useAtom(isEditingAtom)

  return (
    <>
      <Header
        pageTitle={currentContact ? currentContact.name : 'New Contact'}
      />
      <div className='m-auto flex h-14 w-full flex-row'>
        <div className='m-auto flex-1 text-center'>
          <Button
            type='button'
            size='medium'
            onClick={() => {
              setCurrentContact(null)
              setIsEditing(false)
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
      {isEditing ? <ContactForm /> : <ContactInfo />}
    </>
  )
}

export default ContactDetails
