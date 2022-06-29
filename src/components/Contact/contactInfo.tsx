import { UserCircleIcon } from '@heroicons/react/outline'
import data from 'mockData/CONTACT_DATA.json'

function ContactInfo() {
  const currentUser = data[0]
  return (
    <div className='flex flex-col items-center justify-center'>
      <UserCircleIcon className='w-32 rounded-full' />

      <h1 className='text-4xl font-normal'>
        {currentUser.first_name} {currentUser.last_name}
      </h1>
      <h3>{currentUser.notes}</h3>
      <div className='bg-gray-200 rounded-lg border-2 p-1'>
        <h3>Phone</h3>
        <p className='text-red text-xl'>{currentUser.phone}</p>
      </div>
    </div>
  )
}

export default ContactInfo
