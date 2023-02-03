import { ChangeEvent, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/router'
import { UseMutateFunction } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import tw from 'tailwind-styled-components'

import { contactFormAtom } from '@/atoms/contacts'
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

  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    mutate(contactForm, {
      onSuccess(mutatedDocId, _variables, _context) {
        if (isNewContact) router.replace(`/contact/${mutatedDocId}`)
        else router.back()
      }
    })
  }

  return (
    <form onSubmit={submitForm}>
      <div className='flex flex-col items-center justify-center gap-3 pb-24'>
        {/* USER PROFILE IMAGE */}
        <Avatar image='' height={48} width={48} iconClass='w-32 rounded-full' />
        {/* FIRST AND LAST NAME */}
        <Box>
          <label htmlFor={contact.name} className='text-primary-dark'>
            Full Name
          </label>
          <input
            name='name'
            defaultValue={contact.name}
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

          <TagSelector tags={contact.tags} />
          {/* Padding to counter the shadow */}
          <div className='pt-2'></div>
        </Box>
        {/* REGIONS */}
        <Box className='pb-3'>
          <label htmlFor='region' className='text-primary-dark'>
            Region
          </label>
          <RegionSelector regions={contact.region} />
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
        <div className=' flex justify-center gap-2'>
          <Button type='submit' fullwidth>
            Save
          </Button>
          <Button
            type='button'
            intent='secondary'
            fullwidth
            onClick={() => router.back()}
          >
            Cancel
          </Button>
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
