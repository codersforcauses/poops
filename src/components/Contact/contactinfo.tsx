import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import tw from 'tailwind-styled-components'

import Avatar from '@/components/Contact/avatar'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useContact } from '@/context/ContactContext/context'
import useUser from '@/hooks/user'
import { Contact } from '@/types/types'

import Button from '../UI/button'

type ContactInfoProps = {
  firestoreIndex: number
  image: string
}

function ContactInfo({ firestoreIndex, image }: ContactInfoProps) {
  const { data: currentUser } = useUser()
  const {
    allContacts,
    setCreatingNewContact,
    removeContact,
    setDisplayContactIndex
  } = useContact()
  const { setAlert } = useAlert()

  if (currentUser === undefined) return null

  const isContact = firestoreIndex !== -1
  const contact: Contact = isContact
    ? allContacts[firestoreIndex as number]
    : currentUser

  return (
    <div className='mb-2 flex flex-col items-center justify-center gap-3'>
      {/* USER PROFILE IMAGE */}
      <Avatar
        image={image}
        height={48}
        width={48}
        iconClass='w-32 rounded-full'
      />
      {/* FIRST AND LAST NAME */}
      <h1 className='text-4xl font-normal'>{contact.clientName}</h1>
      {/* DESCRIPTION */}
      {isContact && <h3>{contact.desc}</h3>}
      {/* PHONE */}
      <Box>
        <div className='flex w-full justify-between'>
          <label htmlFor={contact.phone} className='text-primary-dark'>
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
          <label htmlFor={contact.email} className='text-primary-dark'>
            Email
          </label>
          <a href={`mailto:${contact.email}`} target='_blank' rel='noreferrer'>
            <EnvelopeIcon className='h-5 w-5' />
          </a>
        </div>
        <span className='text-xl'>{contact.email}</span>
      </Box>
      {/* ADDRESS */}
      <Box>
        <div className='flex w-full justify-between'>
          <label htmlFor={contact.streetAddress} className='text-primary-dark'>
            Address
          </label>
          <a
            href={`http://maps.google.com/?q=${contact.streetAddress}`}
            target='_blank'
            rel='noreferrer'
          >
            <MapPinIcon className='h-5 w-5' />
          </a>
        </div>
        <span className='text-xl'>{contact.streetAddress}</span>
      </Box>
      {/* TAGS */}
      <Box>
        <label htmlFor='tags' className='text-primary-dark'>
          Tags
        </label>
        <TagHolder className='mt-1'>
          {contact.tags.map((tag, index) => (
            <div key={index}>
              <Tag>{tag}</Tag>
            </div>
          ))}
        </TagHolder>
        {/* Padding to counter the shadow */}
        <div className='pt-2'></div>
      </Box>
      {/* REGIONS */}
      {contact.region && (
        <Box className='pb-3'>
          <label htmlFor='regions' className='text-primary-dark'>
            Region
          </label>

          <TagHolder className='mt-1'>
            {contact.region.map((region, index) => (
              <div key={index}>
                <Tag>{region}</Tag>
              </div>
            ))}
          </TagHolder>
        </Box>
      )}
      {/* PETS */}
      {isContact && (
        <Box className='flex flex-col'>
          <label htmlFor={contact.pets} className='text-primary-dark'>
            Pets
          </label>
          <span className='text-xl'>{contact.pets}</span>
        </Box>
      )}
      {/* NOTES */}
      {isContact && (
        <Box className='flex flex-col'>
          <label htmlFor={contact.notes} className='text-primary-dark'>
            Notes
          </label>
          <span className='text-xl'> {contact.notes} </span>
        </Box>
      )}
      <div className='mb-2'>
        {/* can't delete users profile */}
        {isContact && (
          <Button
            type='button'
            onClick={() => {
              setAlert({
                variant: AlertVariant.security,
                title: 'Delete Contact',
                text: 'Are you sure?',
                position: 'bottom',
                confirmFunction: () => {
                  setCreatingNewContact(false)
                  removeContact(firestoreIndex)
                  setDisplayContactIndex(null)
                }
              })
            }}
          >
            Delete Contact
          </Button>
        )}
      </div>
    </div>
  )
}

export default ContactInfo

const Box = tw.div`
    bg-gray-300
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
