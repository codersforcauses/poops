import { useRouter } from 'next/router'
import { PencilIcon } from '@heroicons/react/24/outline'
import { UseMutateFunction } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { isEditingAtom } from '@/atoms/contacts'
import ContactForm from '@/components/Contact/contactform'
import ContactInfo from '@/components/Contact/contactinfo'
import { Contact } from '@/types/types'

import Button from '../UI/button'

interface ContactFormProps {
  contact: Contact
  mutate: UseMutateFunction<
    unknown,
    unknown,
    Contact & { deleteDoc?: boolean },
    unknown
  >
}

const ContactDetails = ({ contact, mutate }: ContactFormProps) => {
  const [isEditing, setIsEditing] = useAtom(isEditingAtom)
  const router = useRouter()

  return (
    <>
      {/* <Header pageTitle={contact ? contact.name : 'New Contact'} /> */}
      <div className='m-auto flex h-14 w-full flex-row'>
        <div className='m-auto flex-1 text-center'>
          <Button
            type='button'
            size='medium'
            onClick={() => {
              if (isEditing) {
                setIsEditing(false)
              } else {
                setIsEditing(false)
                router.back()
              }
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
      {isEditing ? (
        <ContactForm contact={contact} mutate={mutate} />
      ) : (
        <ContactInfo contact={contact} mutate={mutate} />
      )}
    </>
  )
}

export default ContactDetails
