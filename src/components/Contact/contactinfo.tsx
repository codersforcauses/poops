import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import { useAtomValue, useSetAtom } from 'jotai'
import tw from 'tailwind-styled-components'

import { currentContactAtom, isEditingAtom } from '@/atoms/contacts'
import Avatar from '@/components/Contact/avatar'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useMutateContacts } from '@/hooks/contacts'

import Button from '../UI/button'

function ContactInfo() {
  const { setAlert } = useAlert()
  const currentContact = useAtomValue(currentContactAtom)
  const setIsEditing = useSetAtom(isEditingAtom)
  const { mutate: mutateContacts } = useMutateContacts()

  if (currentContact === null) return null

  const isContact = currentContact.docId !== 'USER'

  return (
    <div className='pb-24 flex flex-col items-center justify-center gap-3'>
      {/* USER PROFILE IMAGE */}
      <Avatar image='' height={48} width={48} iconClass='w-32 rounded-full' />
      {/* FIRST AND LAST NAME */}
      <h1 className='text-4xl font-normal'>{currentContact.name}</h1>
      {/* DESCRIPTION */}
      {isContact && <h3>{currentContact.desc}</h3>}
      {/* PHONE */}
      <Box>
        <div className='flex w-full justify-between'>
          <label htmlFor={currentContact.phone} className='text-primary-dark'>
            Phone
          </label>
          <a href={`tel:${currentContact.phone}`}>
            <PhoneIcon className='h-5 w-5' />
          </a>
        </div>
        <span className='text-xl'>{currentContact.phone}</span>
      </Box>
      {/* EMAIL */}
      <Box>
        <div className='flex w-full justify-between'>
          <label htmlFor={currentContact.email} className='text-primary-dark'>
            Email
          </label>
          <a
            href={`mailto:${currentContact.email}`}
            target='_blank'
            rel='noreferrer'
          >
            <EnvelopeIcon className='h-5 w-5' />
          </a>
        </div>
        <span className='text-xl'>{currentContact.email}</span>
      </Box>
      {/* ADDRESS */}
      <Box>
        <div className='flex w-full justify-between'>
          <label
            htmlFor={currentContact.streetAddress}
            className='text-primary-dark'
          >
            Address
          </label>
          <a
            href={`http://maps.google.com/?q=${currentContact.streetAddress}`}
            target='_blank'
            rel='noreferrer'
          >
            <MapPinIcon className='h-5 w-5' />
          </a>
        </div>
        <span className='text-xl'>{currentContact.streetAddress}</span>
      </Box>
      {/* TAGS */}
      <Box>
        <label htmlFor='tags' className='text-primary-dark'>
          Tags
        </label>
        <TagHolder className='mt-1'>
          {currentContact.tags.map((tag, index) => (
            <div key={index}>
              <Tag>{tag}</Tag>
            </div>
          ))}
        </TagHolder>
        {/* Padding to counter the shadow */}
        <div className='pt-2'></div>
      </Box>
      {/* REGIONS */}
      {currentContact.region && (
        <Box className='pb-3'>
          <label htmlFor='regions' className='text-primary-dark'>
            Region
          </label>

          <TagHolder className='mt-1'>
            {currentContact.region.map((region, index) => (
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
          <label htmlFor={currentContact.pets} className='text-primary-dark'>
            Pets
          </label>
          <span className='text-xl'>{currentContact.pets}</span>
        </Box>
      )}
      {/* NOTES */}
      {isContact && (
        <Box className='flex flex-col'>
          <label htmlFor={currentContact.notes} className='text-primary-dark'>
            Notes
          </label>
          <span className='text-xl'> {currentContact.notes} </span>
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
                  mutateContacts({ ...currentContact, deleteDoc: true })
                  setIsEditing(false)
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
