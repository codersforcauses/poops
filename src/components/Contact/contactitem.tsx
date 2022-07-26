import { useContext } from 'react'

import Avatar from '@/components/Contact/avatar'
import { ContactContext } from '@/pages/contact'
import truncateText from '@/utils/truncateText'

type ContactItemProps = {
  image: string
  firestoreIndex: number
}

const ContactItem = ({
  // contact,
  image,
  firestoreIndex
}: ContactItemProps) => {
  const context = useContext(ContactContext)
  const contacts = context.getContacts()
  console.log('contactitem:firestoreIndex: ', firestoreIndex)
  return (
    <div
      onClick={() => context.setDisplayContactIndex(firestoreIndex)}
      onKeyDown={() => context.setDisplayContactIndex(firestoreIndex)}
      role='button'
      tabIndex={0}
    >
      <li className='flex items-center justify-between truncate border-b border-gray-300 bg-white p-3 px-5 text-sm hover:bg-gray-300 focus:bg-gray-300 sm:py-4'>
        {/* USER PROFILE IMAGE */}
        <span className='flex items-center space-x-4'>
          <Avatar image={image} height={40} width={40} iconClass='h-10 w-10' />
          <p className='font-medium text-gray-700'>
            {contacts[firestoreIndex].displayName}
          </p>
        </span>
        <p className='text-gray-500'>
          {truncateText(contacts[firestoreIndex].pets, 16)}
        </p>
      </li>
    </div>
  )
}

export default ContactItem
