import { ChangeEvent, FormEvent, useEffect } from 'react'
import { Dispatch, SetStateAction, useState } from 'react'
import tw from 'tailwind-styled-components'

import Avatar from '@/components/Contact/avatar'
import RegionSelector from '@/components/Contact/regiondropdown'
import TagSelector from '@/components/Contact/tagdropdown'
import { useContact } from '@/context/ContactContext/context'
import { useFirestore } from '@/context/Firebase/Firestore/context'
import type { Contact } from '@/types/types'

import Button from '../UI/button'

type ContactInfoProps = {
  firestoreIndex: number | null
  image: string
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const ContactForm = ({
  firestoreIndex,
  image,
  setIsEditing
}: ContactInfoProps) => {
  const { userDoc, updateUserInfo } = useFirestore()
  const { allContacts, insertContact, setDisplayContactIndex } = useContact()

  const isNewContact = firestoreIndex === null
  const isUser = firestoreIndex === -1

  const contact: Contact = isNewContact
    ? {
        id: '',
        clientName: '',
        desc: '',
        pets: '',
        email: '',
        phone: '',
        streetAddress: '',
        region: [],
        notes: '',
        tags: []
      }
    : isUser
    ? userDoc.info
    : allContacts[firestoreIndex as number]

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

  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    if (isNewContact) {
      firestoreIndex = insertContact(contactForm)
      setDisplayContactIndex(firestoreIndex)
    } else if (isUser) {
      updateUserInfo?.(contactForm)
      setDisplayContactIndex(firestoreIndex)
    } else {
      insertContact(contactForm, firestoreIndex as number)
      setDisplayContactIndex(firestoreIndex)
    }
    setIsEditing(false)
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
          <label htmlFor={contact.clientName} className='text-primary-dark'>
            Full Name
          </label>
          <input
            name='clientName'
            defaultValue={contact.clientName}
            className='border-grey mb-2 w-80 rounded-lg border pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* DESCRIPTION */}
        <Box>
          <label htmlFor={contact.notes} className='text-primary-dark'>
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
          <label htmlFor={contact.phone} className='text-primary-dark'>
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
          <label htmlFor={contact.email} className='text-primary-dark'>
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
          <label htmlFor={contact.streetAddress} className='text-primary-dark'>
            Address
          </label>
          <input
            name='streetAddress'
            defaultValue={contact.streetAddress}
            className='mb-2 w-full rounded-lg border border-gray-300 pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* TAGS */}
        <Box>
          <label htmlFor='tags' className='text-primary-dark'>
            Tags
          </label>

          <TagSelector tags={contact.tags} setTags={setTags} />
          {/* Padding to counter the shadow */}
          <div className='pt-2'></div>
        </Box>
        {/* REGIONS */}
        <Box className='pb-3'>
          <label htmlFor='region' className='text-primary-dark'>
            Region
          </label>
          <RegionSelector regions={contact.region} setRegions={setRegions} />
        </Box>
        <Box>
          <label htmlFor='pets' className='text-primary-dark'>
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
          <label htmlFor={contact.notes} className='text-primary-dark'>
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
          <div className='space-y-2'>
            <Button type='submit' fullwidth>
              Save
            </Button>
            {!isNewContact && (
              <Button
                intent='secondary'
                fullwidth
                onClick={() => {
                  if (setIsEditing !== undefined) setIsEditing(false)
                }}
              >
                Cancel
              </Button>
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
