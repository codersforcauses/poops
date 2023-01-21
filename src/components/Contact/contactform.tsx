import { ChangeEvent, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/router'
import { UseMutateFunction } from '@tanstack/react-query'
import { useAtom, useSetAtom } from 'jotai'
import tw from 'tailwind-styled-components'

import { contactFormAtom, isEditingAtom } from '@/atoms/contacts'
import Avatar from '@/components/Contact/avatar'
import RegionSelector from '@/components/Contact/regiondropdown'
import TagSelector from '@/components/Contact/tagdropdown'
import { Contact } from '@/types/types'

import Button from '../UI/button'

interface ContactFormProps {
  contact: Contact
  isNewContact?: boolean
  mutate: UseMutateFunction<
    unknown,
    unknown,
    Contact & { deleteDoc?: boolean },
    unknown
  >
}

const ContactForm = ({
  contact,
  isNewContact = false,
  mutate
}: ContactFormProps) => {
  const router = useRouter()
  const setIsEditing = useSetAtom(isEditingAtom)
  const [contactForm, setContactForm] = useAtom(contactFormAtom)

  useEffect(() => {
    setContactForm(contact)
  }, [setContactForm, contact])

  if (contactForm === null) return null

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
    setIsEditing(false)
    mutate(contactForm, {
      onSuccess(mutatedDocId, _variables, _context) {
        if (isNewContact) router.replace(`/contact/${mutatedDocId}`)
      }
    })
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
          <label htmlFor={contact.clientName} className='text-dark-red'>
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
            name='streetAddress'
            defaultValue={contact.streetAddress}
            className='mb-2 w-full rounded-lg border border-gray-300 pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* TAGS */}
        <Box>
          <label htmlFor='tags' className='text-dark-red'>
            Tags
          </label>

          <TagSelector tags={contact.tags} setTags={setTags} />
          {/* Padding to counter the shadow */}
          <div className='pt-2'></div>
        </Box>
        {/* REGIONS */}
        <Box className='pb-3'>
          <label htmlFor='region' className='text-dark-red'>
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
        <div className=' flex justify-center gap-2'>
          <Button type='submit' fullwidth>
            Save
          </Button>
          {!isNewContact && (
            <Button
              intent='secondary'
              fullwidth
              onClick={() => {
                setIsEditing(false)
              }}
            >
              Cancel
            </Button>
          )}
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
