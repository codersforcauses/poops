import Image from 'next/image'
import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  UserCircleIcon
} from '@heroicons/react/outline'
import tw from 'tailwind-styled-components'

import RegionSelector from '@/components/Contact/regiondropdown'
import type { Contact } from '@/types/types'

type ContactInfoProps = {
  contact: Contact
  image: string
}

function ContactInfo({ contact, image }: ContactInfoProps) {
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
      {/* FIRST AND LAST NAME */}
      <h1 className='text-4xl font-normal'>
        {contact.first_name} {contact.last_name}
      </h1>
      {/* DESCRIPTION */}
      <h3>{contact.notes}</h3>
      {/* PHONE */}
      <Box>
        <div className='flex w-full justify-between'>
          <label htmlFor={contact.phone} className='text-dark-red'>
            Phone
          </label>
          <a href={`tel:${contact.phone}`}>
            <PhoneIcon className='h-5 w-5' />
          </a>
        </div>
        <span className='text-xl'>{contact.phone}</span>
      </Box>
      {/* EMAIL */}
      <Box>
        <div className='flex w-full justify-between'>
          <label htmlFor={contact.email} className='text-dark-red'>
            Email
          </label>
          <a href={`mailto:${contact.email}`} target='_blank' rel='noreferrer'>
            <MailIcon className='h-5 w-5' />
          </a>
        </div>
        <span className='text-xl'>{contact.email}</span>
      </Box>
      {/* ADDRESS */}
      <Box>
        <div className='flex w-full justify-between'>
          <label htmlFor={contact.street_address} className='text-dark-red'>
            Address
          </label>
          <a
            href={`http://maps.google.com/?q=${contact.street_address}`}
            target='_blank'
            rel='noreferrer'
          >
            <LocationMarkerIcon className='h-5 w-5' />
          </a>
        </div>
        <span className='text-xl'>{contact.street_address}</span>
      </Box>
      {/* TAGS */}
      <Box>
        <div className='flex w-full justify-between'>
          <label htmlFor='tags' className='text-dark-red'>
            Tags
          </label>
          <PlusIcon className='h-5 w-5' />
        </div>
        <TagHolder className='mt-1'>
          <br />{' '}
        </TagHolder>
        {/* This should be done as a react component i think? */}
        {/* Padding to counter the shadow */}
        {/* I am sorry for how horrific this is
        It creates a union array of 'client', 'coordinator', 'volunteer'
         and the contact's tags, then displays all of them and checks 
         those found in contact*/}
        <div className='pt-2'>
          {[
            ...new Set([...contact.tags, 'client', 'coordinator', 'volunteer'])
          ].map((tag, index) => {
            return (
              <div key={index}>
                <label>
                  <input
                    type='checkbox'
                    defaultChecked={contact.tags.includes(tag)}
                  />{' '}
                  {tag}
                </label>
                <br />
              </div>
            )
          })}
        </div>
      </Box>
      {/* REGIONS */}
      <Box className='pb-3'>
        <label htmlFor='regions' className='text-dark-red'>
          Region
        </label>
        <RegionSelector regions={contact.region} />
        <TagHolder className='mt-1'>
          {contact.region.map((region, index) => (
            <div key={index}>
              <Tag>{region}</Tag>
            </div>
          ))}
        </TagHolder>
      </Box>
      <Box>
        <label htmlFor='pets' className='text-dark-red'>
          Pets
        </label>
        <span className='text-xl'>
          {contact.pets.map((pet, index) => (
            <div key={index}>
              <PetContainer>
                <p className='text-dark-red'>{pet.name}</p> {pet.notes}
              </PetContainer>
            </div>
          ))}
        </span>
      </Box>
      {/* NOTES */}
      <Box className='flex flex-col'>
        <label htmlFor={contact.notes} className='text-dark-red'>
          Notes
        </label>
        <span className='text-xl'> {contact.notes} </span>
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

const PetContainer = tw.div`
  px-2
  my-2
  bg-white
  rounded-2xl
`
