import { ChangeEvent, useEffect } from 'react'
import { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import tw from 'tailwind-styled-components'

import Avatar from '@/components/Contact/avatar'
import validationSchema from '@/components/Contact/validation'
import Form from '@/components/UI/FormComponents/Form'
import { CreateSelect } from '@/components/UI/FormComponents/SelectFields'
import { SelectOption } from '@/components/UI/FormComponents/SelectFields/utils'
import TextField from '@/components/UI/FormComponents/TextField'
import { useContact } from '@/context/ContactContext/context'
import type { Contact } from '@/types/types'

import Button from '../UI/button'

type ContactInfoProps = {
  firestoreIndex: number
  image: string
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

export interface FormValues {
  fullName: string
  clientDescription: string
  clientPhoneNumber: number
  clientEmail: string
  clientAddress: string
  clientTags: SelectOption<string>[]
  clientRegion: SelectOption<string>[]
  clientPets: string
  clientNotes: string
}

const ContactForm = ({
  firestoreIndex,
  image,
  setIsEditing
}: ContactInfoProps) => {
  const { allContacts, insertContact, setDisplayContactIndex } = useContact()

  const isNewContact = firestoreIndex === -1

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
    : allContacts[firestoreIndex]

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
  const submitForm: SubmitHandler<FormValues> = async (formData: FormValues) => {
    // TODO: submit to firestore here
    console.log(formData.clientRegion)
    console.log(formData.clientTags)
    const contactData: Contact = {
      id: '',
      clientName: formData.fullName,
      desc: formData.clientDescription,
      pets: formData.clientPets,
      email: formData.clientEmail,
      phone: formData.clientPhoneNumber.toString(),
      streetAddress: formData.clientAddress,
      region: formData.clientRegion.map((region) => {
        return region.label
      }),
      notes: formData.clientNotes,
      tags: formData.clientTags.map((tag) => {
        return tag.label
      })
    }

    if (isNewContact) {
      firestoreIndex = insertContact(contactData)
      setDisplayContactIndex(firestoreIndex)
    } else {
      insertContact(contactForm, firestoreIndex)
      setDisplayContactIndex(firestoreIndex)
    }
    setIsEditing(false)
  }

  return (
    <Form<FormValues>
      onSubmit={submitForm}>

      
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

          <TextField
            label='Full Name'
            name='fullName'
            defaultValue={contact.clientName}
            className='border-grey mb-2 w-80 rounded-lg border pl-1'
            rules={validationSchema.fullName}
          />
        </Box>
        {/* DESCRIPTION */}
        <Box>

          <TextField
            label='Description'
            name='clientDescription'
            defaultValue={contact.desc}
            className='w-80 rounded-lg border border-gray-300 pl-1'
            rules={validationSchema.clientDescription}
          />
        </Box>
        {/* PHONE */}
        <Box>

          <TextField
            label='Phone Number'
            name='clientPhoneNumber'
            defaultValue={contact.phone}
            className='mb-2 w-full rounded-lg border border-gray-300 pl-1'
            rules={validationSchema.clientPhoneNumber}
          />
        </Box>
        {/* EMAIL */}
        <Box>

          <TextField
            label='Email'
            name='clientEmail'
            defaultValue={contact.email}
            className='mb-2 w-full rounded-lg border border-gray-300 pl-1'
            rules={validationSchema.clientEmail}
          />
        </Box>
        {/* ADDRESS */}
        <Box>

          <TextField
            label='Address'
            name='clientAddress'
            defaultValue={contact.streetAddress}
            className='mb-2 w-full rounded-lg border border-gray-300 pl-1'
            rules={validationSchema.clientAddress}
          />
        </Box>
        {/* TAGS */}
        <Box>

          <CreateSelect<SelectOption<string>, true>
            label='Tags'
            name='clientTags'
            isMulti
            isSearchable
            rules={validationSchema.clientTags}
          />

          {/* Padding to counter the shadow */}
          <div className='pt-2'></div>
        </Box>
        {/* REGIONS */}
        <Box className='pb-3'>

            <CreateSelect<SelectOption<string>, true>
              label='Regions'
              name='clientRegion'
              isMulti
              isSearchable
            />
        </Box>
        
        <Box>

          <TextField
            label='Pets'
            name='clientPets'
            defaultValue={contact.pets}
            className='mb-2 w-80 rounded-lg border border-gray-300 pl-1'
            rules={validationSchema.clientPets}
          />
        </Box>
        {/* NOTES */}
        <Box>

          <TextField
            label='Notes'
            name='clientNotes'
            defaultValue={contact.notes}
            className='w-full rounded-lg border border-gray-300'
            rules={validationSchema.clientNotes}
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
    </Form>
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
export type ContactFormValues = keyof FormValues
