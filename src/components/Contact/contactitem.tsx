import { useRouter } from 'next/router'

import Avatar from '@/components/Contact/avatar'
import { Contact } from '@/types/types'

type ContactItemProps = {
  contact: Contact
}

const ContactItem = ({ contact }: ContactItemProps) => {
  const router = useRouter()

  if (contact.docId === undefined) return null

  const navigateToContact = () => {
    const contactUrl =
      contact.docId === 'USER' ? '/profile' : `/contact/${contact.docId}`
    router.push(contactUrl)
  }

  return (
    <button
      className='w-full'
      onClick={navigateToContact}
      onKeyDown={navigateToContact}
    >
      <li className='flex items-center justify-between gap-2 border-b border-gray-300 bg-white p-3 px-5 text-sm hover:bg-gray-300 focus:bg-gray-300 sm:py-4'>
        <span className='flex max-w-[60%] shrink items-center space-x-4'>
          <span>
            <Avatar image='' height={40} width={40} iconClass='h-10 w-10' />
          </span>
          <p className='truncate font-medium text-gray-700'>{contact.name}</p>
        </span>
        {contact.pets && (
          <p className='max-w-[60%] truncate text-gray-500'>{contact.pets}</p>
        )}
      </li>
    </button>
  )
}

export default ContactItem
