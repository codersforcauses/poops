import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/outline'
import tw from 'tailwind-styled-components'

import type { Contact } from '@/types/types'

type contactProp = {
  contact: Contact
  image: string
}

function ContactInfo({ contact, image }: contactProp) {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      {image === '' ? (
        <UserCircleIcon className='w-32 rounded-full' />
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
      <h1 className='text-4xl font-normal'>
        {contact.first_name} {contact.last_name}
      </h1>
      <h3>{contact.notes}</h3>

      <h1 className='text-4xl font-normal'>
        {contact.first_name} {contact.last_name}
      </h1>
      <h3>{contact.notes}</h3>

      <Box>
        <h3>Phone</h3>
        <p className='text-xl text-poops-red'>{contact.phone}</p>
      </Box>
      <Box>
        <h3>Email</h3>
        <p className='text-xl text-poops-red'>{contact.email}</p>
      </Box>
      <Box>
        <h3>Address</h3>
        <p className='text-xl text-poops-red'>{contact.street_address}</p>
      </Box>
      <Box>
        <h3>Tags</h3>
        <div className='h-auto bg-white bg-opacity-100'>
          Tags
          <br />
          <label>
            <input type='checkbox' /> Coordinator
          </label>
          <br />
          Hi
          <br />{' '}
        </div>
        {/* This should be done as a react component i think? */}
        <label>
          <input type='checkbox' /> Client
        </label>
        <br />
        <label>
          <input type='checkbox' /> Coordinator
        </label>
        <br />
        <label>
          <input type='checkbox' /> Volunteer
        </label>
      </Box>
      <Box>
        <h3>Region </h3>
      </Box>
      <Box>
        <h3>Pets </h3>
        <p className='text-xl text-poops-red'>{contact.pets}</p>
      </Box>
      <Box>Notes</Box>
    </div>
  )
}

export default ContactInfo

const Box = tw.div`
    bg-grey
    bg-opacity-20
    box-content
    w-80
    rounded-lg
    border-2
    px-3
    py-1
`
