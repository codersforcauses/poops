import { useEffect, useMemo } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { SubmitHandler } from 'react-hook-form'

import {
  contactFormAtom,
  currentContactAtom,
  isEditingAtom
} from '@/atoms/contacts'
import Avatar from '@/components/Contact/avatar'
import validationSchema from '@/components/Contact/validation'
import Form from '@/components/UI/FormComponents/Form'
import { CreateSelect } from '@/components/UI/FormComponents/SelectFields'
import TextField from '@/components/UI/FormComponents/TextField'
import { useMutateContacts } from '@/hooks/contacts'
import useUser, { useMutateUser } from '@/hooks/user'
import { Contact, SelectOption } from '@/types/types'

import Button from '../UI/button'



export interface contactForm {
  name: string
  phone: string
  email: string
  address: string
  desc: string
  tags: SelectOption<string>[]
  region: SelectOption<string>[]
  pets: string
  notes: string

}

const ContactForm = () => {
  const currentContact = useAtomValue(currentContactAtom)
  const setIsEditing = useSetAtom(isEditingAtom)
  const [contactForm, setContactForm] = useAtom(contactFormAtom)
  const { data: currentUser } = useUser()
  const { mutate: mutateUser } = useMutateUser()
  const { mutate: mutateContacts } = useMutateContacts()

  const isNewContact = currentContact === null
  const isUser = currentContact?.docId === currentUser?.docId

  const contact = useMemo(
    () =>
      isNewContact
        ? {
            name: '',
            desc: '',
            pets: '',
            email: '',
            phone: '',
            streetAddress: '',
            region: [],
            notes: '',
            tags: ['Client']
          }
        : currentContact,
    [isNewContact, currentContact]
  )

  useEffect(() => {
    if (contact !== null) {
      setContactForm(contact)
    }
  }, [contact, setContactForm])

  if (currentUser === null || contactForm === null) return null



  const submitForm: SubmitHandler<contactForm> = async (formData) => {

    const data: Contact = {
      docId: currentContact?.docId,
      name: formData.name,
      desc: formData.desc,
      phone: formData.phone,
      email: formData.email,
      streetAddress: formData.address,
      tags: formData.tags.map((tag) => {return tag.value}),
      region: formData.region.map((region) => {return region.value}),
      pets: formData.pets,
      notes: formData.notes
    }

    if (isUser) {
      mutateUser(data)
    } else {
      mutateContacts(data)
    }

    setIsEditing(false)
  }

  

  return (
    <Form<contactForm>
      onSubmit={submitForm}
      defaultValues= {contact}>
      
      <div className='flex flex-col items-center justify-center gap-3'>
        {/* USER PROFILE IMAGE */}
        <Avatar image='' height={48} width={48} iconClass='w-32 rounded-full' />
        {/* FIRST AND LAST NAME */}
        <TextField
          label='name'
          type='string'
          name='name'
          rules={validationSchema.name}
        />
          
        {/* DESCRIPTION */}
        <TextField
          label='description'
          type='string'
          name='desc'
          rules={validationSchema.desc}
        />
        {/* PHONE */}
        <TextField
          label='phone'
          type='string'
          name='phone'
          rules={validationSchema.phone}
        />
        {/* EMAIL */}
        <TextField
          label='email'
          type='string'
          name='email'
          rules={validationSchema.email}
        />
        {/* ADDRESS */}
        <TextField
          label='address'
          type='string'
          name='address'
          rules={validationSchema.address}
        />
        {/* TAGS */}
        <CreateSelect<SelectOption<string>, true>
          label='tags'
          name='tags'
          isMulti
          rules={validationSchema.tags}
          isSearchable
        />
        {/* REGIONS */}
        <CreateSelect<SelectOption<string>, true>
          label='region'
          name='region'
          rules={validationSchema.region}
          isSearchable
          isMulti
        />
        
        {/* PETS */}
        <TextField
          label='pets'
          type='string'
          name='pets'
          rules={validationSchema.pets}
        />

        {/* NOTES */}
        <TextField
          label='notes'
          type='string'
          name='notes'
          rules={validationSchema.notes}
        />
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

// const Box = tw.div`
//     bg-gray-300
//     bg-opacity-20
//     box-content
//     w-80
//     rounded-lg
//     px-3
//     py-1
//     break-words
// `
export type ContactFormValues = keyof contactForm