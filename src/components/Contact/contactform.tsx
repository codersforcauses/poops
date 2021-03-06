import { ChangeEvent, FormEvent, useEffect } from 'react'
import { Dispatch, SetStateAction, useState } from 'react'
import tw from 'tailwind-styled-components'

import Avatar from '@/components/Contact/avatar'
import RegionSelector from '@/components/Contact/regiondropdown'
import TagSelector from '@/components/Contact/tagdropdown'
import type { Contact } from '@/types/types'

type ContactInfoProps = {
  contact: Contact
  image: string
  setIsEditing?: Dispatch<SetStateAction<boolean>>
  isNewContact: boolean
}

const ContactForm = ({
  contact,
  image,
  setIsEditing,
  isNewContact
}: ContactInfoProps) => {
  const [regions, setRegions] = useState(contact.region)
  const [tags, setTags] = useState(contact.tags)
  const [contactForm, setContactForm] = useState(contact)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setContactForm({ ...contactForm, [name]: value })
  }

  useEffect(() => {
    setContactForm((contactForm) => ({
      ...contactForm,
      tags: tags,
      region: regions
    }))
  }, [regions, tags])

  // TODO: Submit ContactForm to database
  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    if (setIsEditing !== undefined) setIsEditing(false)

    if (isNewContact) {
      // TODO: generate UUID (uuid lib or server timestamp)for the new contact (or let firestore do it)
      // TODO: submit to firestore here
    } else {
      // TODO: update firestore entry for existing uuid
    }
    // TODO: go to /contact/[UUID]
  }

  return (
    <form onSubmit={submitForm}>
      <div className='flex flex-col items-center justify-center gap-3'>
        {/* USER PROFILE IMAGE */}
        <Avatar
          image={image}
          height={48}
          width={48}
          iconClass='w-32 rounded-full'
        />
        {/* FIRST AND LAST NAME */}
        <Box>
          <label htmlFor={contact.firstName} className='text-dark-red'>
            First Name
          </label>
          <input
            name='first_name'
            defaultValue={contact.firstName}
            className='mb-2 w-80 rounded-lg border border-gray-300 pl-1'
            onChange={handleInputChange}
          />
        </Box>
        <Box>
          <label htmlFor={contact.lastName} className='text-dark-red'>
            Last Name
          </label>
          <input
            name='last_name'
            defaultValue={contact.lastName}
            className='mb-2 w-80 rounded-lg border border-gray-300 pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* DESCRIPTION */}
        <Box>
          <label htmlFor={contact.notes} className='text-dark-red'>
            Description
          </label>
          <textarea
            name='desc'
            defaultValue={contact.desc}
            className='w-80 rounded-lg border border-gray-300 pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* PHONE */}
        <Box>
          <label htmlFor={contact.phone} className='text-dark-red'>
            Phone
          </label>
          <input
            name='phone'
            defaultValue={contact.phone}
            className='mb-2 w-full rounded-lg border border-gray-300 pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* EMAIL */}
        <Box>
          <label htmlFor={contact.email} className='text-dark-red'>
            Email
          </label>
          <input
            name='email'
            defaultValue={contact.email}
            className='mb-2 w-full rounded-lg border border-gray-300 pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* ADDRESS */}
        <Box>
          <label htmlFor={contact.streetAddress} className='text-dark-red'>
            Address
          </label>
          <input
            name='street_address'
            defaultValue={contact.streetAddress}
            className='mb-2 w-full rounded-lg border border-gray-300 pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* TAGS */}
        {contact.id !== 'me' && (
          <Box>
            <label htmlFor='tags' className='text-dark-red'>
              Tags
            </label>
            <TagSelector tags={contact.tags} setTags={setTags} />
            {/* This should be done as a react component i think? */}
            {/* Padding to counter the shadow */}
            <div className='pt-2'></div>
          </Box>
        )}
        {/* REGIONS */}
        <Box className='pb-3'>
          <label htmlFor='regions' className='text-dark-red'>
            Region
          </label>
          <RegionSelector regions={contact.region} setRegions={setRegions} />
        </Box>
        <Box>
          <label htmlFor='pets' className='text-dark-red'>
            Pets
          </label>
          <input
            name='pets'
            defaultValue={contact.pets}
            className='mb-2 w-80 rounded-lg border border-gray-300 pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* NOTES */}
        <Box>
          <label htmlFor={contact.notes} className='text-dark-red'>
            Notes
          </label>
          <textarea
            name='notes'
            defaultValue={contact.notes}
            className='w-full rounded-lg border border-gray-300'
            onChange={handleInputChange}
          />
        </Box>
        {/* FORM BUTTONS */}
        <div className='mb-3 flex justify-center'>
          <div className='flex flex-col space-y-1'>
            <button
              type='submit'
              className='w-80 rounded bg-primary py-1 font-bold text-white hover:bg-dark-red'
            >
              Save
            </button>
            {!isNewContact && (
              <button
                type='button'
                className='bg-grey hover:bg-grey w-80 rounded py-1 font-bold text-black'
                onClick={() => {
                  if (setIsEditing !== undefined) setIsEditing(false)
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

export default ContactForm

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
