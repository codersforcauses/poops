import Avatar from '@/components/Contact/avatar'
import type { Contact } from '@/types/types'

type ContactItemProps = {
  contact: Contact
  image: string
}

const ContactItem = ({ contact, image }: ContactItemProps) => {
  return (
    <li className='border-b border-gray-300 bg-white p-3 px-5 hover:bg-gray-300 focus:bg-gray-300 sm:py-4'>
      <div className='flex items-center space-x-4'>
        {/* USER PROFILE IMAGE */}
        <Avatar image={image} height={40} width={40} iconClass='h-10 w-10' />
        <div className='min-w-0 flex-1'>
          <p className='truncate text-sm font-medium text-gray-900'>
            {`${contact.firstName} ${contact.lastName}`}
          </p>
        </div>
      </div>
    </li>
  )
}

export default ContactItem
