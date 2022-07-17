import { Dispatch, SetStateAction } from 'react'

import Avatar from '@/components/Contact/avatar'
import type { Contact } from '@/types/types'

type ContactItemProps = {
  contact: Contact
  image: string
  setDisplayContact: Dispatch<SetStateAction<Contact | null>>
}

const ContactItem = ({
  contact,
  image,
  setDisplayContact
}: ContactItemProps) => {
  return (
    <>
      {/* if a contact item was clicked we want to display the contact data  */}

      <li className='border-b border-grey bg-white p-3 px-5 hover:bg-grey focus:bg-grey sm:py-4'>
        <div
          className='flex items-center space-x-4'
          onClick={() => setDisplayContact(contact)}
          onKeyDown={() => setDisplayContact(contact)}
          role='button'
          tabIndex={0}
        >
          {/* USER PROFILE IMAGE */}
          <Avatar image={image} height={40} width={40} iconClass='h-10 w-10' />
          <div className='min-w-0 flex-1'>
            <p className='text-gray-900 truncate text-sm font-medium'>
              {contact.displayName}
            </p>
          </div>
        </div>
      </li>
    </>
  )
}

export default ContactItem
