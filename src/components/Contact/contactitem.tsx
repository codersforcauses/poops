import Avatar from '@/components/Contact/avatar'
import type { ContactData } from '@/types/types'
import truncateText from '@/utils/truncateText'

type ContactItemProps = {
  contact: ContactData
  image: string
}

const ContactItem = ({ contact, image }: ContactItemProps) => {
  const petNames = contact.pets
    .map((pet) => {
      return pet.name
    })
    .join(', ')

  return (
    <li className='flex items-center justify-between truncate border-b border-gray-300 bg-white p-3 px-5 text-sm hover:bg-gray-300 focus:bg-gray-300 sm:py-4'>
      {/* USER PROFILE IMAGE */}
      <span className='flex items-center space-x-4'>
        <Avatar image={image} height={40} width={40} iconClass='h-10 w-10' />
        <p className='font-medium text-gray-700'>{contact.displayName}</p>
      </span>
      <p className='text-gray-500'>{truncateText(petNames, 16)}</p>
    </li>
  )
}

export default ContactItem
