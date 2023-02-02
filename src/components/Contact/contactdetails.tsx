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
      <div className='my-4 mx-6 flex h-14 flex-row justify-between'>
        <div className='text-center'>
          <Button
            type='button'
            size='medium'
            onClick={() => {
              if (isEditing) {
                setIsEditing(false)
              } else {
                router.back()
              }
            }}
          >
            Back
          </Button>
        </div>
        <div>
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
