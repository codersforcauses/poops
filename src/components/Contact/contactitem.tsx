import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/outline'

type contactData = {
  id: string
  first_name: string
  last_name: string
  pets: string
  email: string
  phone: string
  street_address: string
  region: string
  notes: string
}

type ContactItemProps = {
  contact: contactData
  image: string
}

const ContactItem = ({ contact, image }: ContactItemProps) => {
  return (
    <>
      <li className='rounded-lg bg-white p-3 px-5 hover:bg-grey focus:bg-grey sm:py-4'>
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
