import Image from 'next/image'
import {
  LocationMarkerIcon,
  MailIcon,
  PlusIcon,
  UserCircleIcon
} from '@heroicons/react/outline'
import tw from 'tailwind-styled-components'

import type { Contact } from '@/types/types'

type ContactInfoProps = {
  contact: Contact
  image: string
  isEditing: boolean
}

function ContactInfo({ contact, image, isEditing }: ContactInfoProps) {
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
      {!isEditing ? (
        <h3>{contact.notes}</h3>
      ) : (
        <input
          defaultValue={contact.notes}
          className='w-80 rounded-lg border border-grey pl-1'
        />
      )}

      <Box>
        <h3>Phone</h3>
        {!isEditing ? (
          <p className='text-xl text-primary'>{contact.phone}</p>
        ) : (
          <input
            defaultValue={contact.phone}
            className='w-full rounded-lg border border-grey pl-1'
          />
        )}
      </Box>
      <Box>
        <div className='flex w-full justify-between'>
          <h3>Email</h3>
          <a href={`mailto:${contact.email}`} target='_blank' rel='noreferrer'>
            <MailIcon className='h-5 w-5' />
          </a>
        </div>
        {!isEditing ? (
          <p className='text-xl text-primary'>{contact.email}</p>
        ) : (
          <input
            defaultValue={contact.email}
            className='w-full rounded-lg border border-grey pl-1'
          />
        )}
      </Box>
      <Box>
        <div className='flex w-full justify-between'>
          <h3>Address</h3>
          <a
            href={`http://maps.google.com/?q=${contact.street_address}`}
            target='_blank'
            rel='noreferrer'
          >
            <LocationMarkerIcon className='h-5 w-5' />
          </a>
        </div>
        {!isEditing ? (
          <p className='text-xl text-primary'>{contact.street_address}</p>
        ) : (
          <input
            defaultValue={contact.street_address}
            className='w-full rounded-lg border border-grey pl-1'
          />
        )}
      </Box>
      <Box>
        <div className='flex w-full justify-between'>
          <h3>Tags</h3>
          <PlusIcon className='h-5 w-5' />
        </div>
        <TagHolder className='mt-1'>
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
        <TagHolder className='mt-1'>
          <Tag>hello</Tag>
          <Tag>hi</Tag>
        </TagHolder>
      </Box>
      <Box>
        <h3>Pets </h3>
        {!isEditing ? (
          <p className='text-xl text-primary'>{contact.pets}</p>
        ) : (
          <input
            defaultValue={contact.pets}
            className='w-full rounded-lg border border-grey pl-1'
          />
        )}
      </Box>

      <Box>
        <h3>Notes</h3>
        {!isEditing ? (
          <p> THIS IS A NOTE </p>
        ) : (
          <textarea
            defaultValue={contact.notes}
            className='w-full rounded-lg border border-grey'
          />
        )}
      </Box>
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
    break-words
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
  bg-primary
  text-white
  rounded-2xl
`
