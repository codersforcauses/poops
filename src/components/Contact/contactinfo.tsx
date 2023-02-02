import Router, { useRouter } from 'next/router'
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import { UseMutateFunction } from '@tanstack/react-query'
import { signOut } from 'firebase/auth'
import tw from 'tailwind-styled-components'

import Avatar from '@/components/Contact/avatar'
import { auth } from '@/components/Firebase/init'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { Contact } from '@/types/types'

import Button from '../UI/button'

interface ContactFormProps {
  contact: Contact
  mutate: UseMutateFunction<
    unknown,
    unknown,
    Contact & { deleteDoc?: boolean },
    unknown
  >
}

function ContactInfo({ contact, mutate }: ContactFormProps) {
  const router = useRouter()
  const { setAlert } = useAlert()

  const isContact = contact.docId !== 'USER'

  return (
    <div className='flex flex-col items-center justify-center gap-3 pb-24'>
      {/* USER PROFILE IMAGE */}
      <Avatar image='' height={48} width={48} iconClass='w-32 rounded-full' />
      {/* FIRST AND LAST NAME */}
      <h1 className='text-4xl font-normal'>{contact.name}</h1>
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
        {isContact ? (
          <Button
            type='button'
            onClick={() => {
              setAlert({
                variant: AlertVariant.security,
                title: 'Delete Contact',
                text: 'Are you sure?',
                position: 'bottom',
                confirmFunction: () => {
                  mutate({ ...contact, deleteDoc: true })
                  router.replace('/contact')
                }
              })
            }}
          >
            Delete Contact
          </Button>
        ) : (
          <Button
            type='button'
            onClick={async () => {
              try {
                await signOut(auth) //TODO
                Router.push('/login')
              } catch (error) {
                //eslint-disable-next-lineZ
                console.log('log out failed', { cause: error })
              }
            }}
          >
            Logout
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
