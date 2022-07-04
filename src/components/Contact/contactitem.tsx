import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/outline'

import type { Contact } from '@/types/types'

type ContactItemProps = {
  contact: Contact
  image: string
}

const ContactItem = ({ contact, image }: ContactItemProps) => {
  return (
    <>
      <li className='border-b border-grey bg-white p-3 px-5 hover:bg-grey focus:bg-grey sm:py-4'>
        <div className='flex items-center space-x-4'>
          {/* This is a placeholder image */}
          {image === '' ? (
            <UserCircleIcon className='h-12 w-12' />
          ) : (
            <Image
              className='h-2 w-2 rounded-full'
              src={image}
              alt='Neil image'
              width={48}
              height={48}
              layout='fixed'
            />
          )}
          <div className='min-w-0 flex-1'>
            <p className='text-gray-900 truncate text-sm font-medium'>
              {`${contact.first_name} ${contact.last_name}`}
            </p>
          </div>
        </div>
      </li>
    </>
  )
}

export default ContactItem
