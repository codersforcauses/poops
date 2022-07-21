import Avatar from '@/components/Contact/avatar'
import type { Contact } from '@/types/types'
import truncateText from '@/utils/truncateText'

type ContactItemProps = {
  contact: Contact
  image: string
}

const ContactItem = ({ contact, image }: ContactItemProps) => {
  return (
    <li className='flex items-center justify-between truncate border-b border-gray-300 bg-white p-3 px-5 text-sm hover:bg-gray-300 focus:bg-gray-300 sm:py-4'>
      {/* USER PROFILE IMAGE */}
      <span className='flex items-center space-x-4'>
        <Avatar image={image} height={40} width={40} iconClass='h-10 w-10' />
        <p className='font-medium text-gray-700'>
          {truncateText(`${contact.firstName} ${contact.lastName}`, 24)}
        </p>
      </span>
      <p className='text-gray-500'>{truncateText(contact.pets, 16)}</p>
    </li>
  )
}

export default ContactItem
