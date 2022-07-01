import Image from 'next/image'
import { LocationMarkerIcon, UserCircleIcon } from '@heroicons/react/outline'
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

      <Box>
        <h3>Phone</h3>
        <p className='text-xl text-poops-red'>{contact.phone}</p>
      </Box>
      <Box>
        <h3>Email</h3>
        <p className='text-xl text-poops-red'>{contact.email}</p>
      </Box>
      <Box>
        <div className='flex w-full justify-between'>
          <h3>Address</h3>
          <a
            href={`http://maps.google.com/?q=${contact.street_address}`}
            target='_blank'
            className='h-6 w-6'
            rel='noreferrer'
          >
            <LocationMarkerIcon />
          </a>
        </div>
        <p className='text-xl text-poops-red'>{contact.street_address}</p>
      </Box>
      <Box>
        <h3>Tags</h3>
        <TagHolder className=''>
          <br />{' '}
        </TagHolder>
        {/* This should be done as a react component i think? */}
        {/* Padding to counter the shadow */}
        <div className='pt-2'>
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
        </div>
      </Box>
      {/* Padding to counter shadow */}
      <Box className='pb-3'>
        <h3>Region </h3>
        <TagHolder>
          <Tag>hello</Tag>
          <Tag>hi</Tag>
        </TagHolder>
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
    px-3
    py-1
`
// Styling for div that holds the selected tags
const TagHolder = tw.div`
    h-auto
    bg-white
    shadow-md
    shadow-[0_5px_1.5px_-1.5px_#ce283d]
    rounded-xl
    flex
    p-1
`
// Styling for individual tags
const Tag = tw.div`
  px-2
  border-2
  bg-poops-red
  text-white
  rounded-2xl
`
