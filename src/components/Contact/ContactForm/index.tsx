import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { UseMutateFunction } from '@tanstack/react-query'
import { useAtom, useSetAtom } from 'jotai'
import { SubmitHandler } from 'react-hook-form'

import { contactFormAtom, isEditingAtom } from '@/atoms/contacts'
import Avatar from '@/components/Contact/avatar'
import validationSchema from '@/components/Contact/ContactForm/validation'
import Form from '@/components/UI/FormComponents/Form'
import { CreateSelect } from '@/components/UI/FormComponents/SelectFields'
import TextField from '@/components/UI/FormComponents/TextField'
import { Contact, SelectOption } from '@/types/types'

import Button from '../../UI/button'

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

interface ContactFormValues {
  name: string
  desc: string
  pets: string
  email: string
  phone: string
  streetAddress: string
  region: SelectOption<string>[]
  notes: string
  tags: SelectOption<string>[]
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

  // TODO: Submit ContactForm to database
  const submitForm: SubmitHandler<ContactFormValues> = (
    formData: ContactFormValues
  ) => {
    console.log(formData)

    const data: Contact = {
      docId: contact.docId,
      name: formData.name,
      desc: formData.desc,
      pets: formData.pets,
      email: formData.email,
      phone: formData.phone,
      streetAddress: formData.streetAddress,
      region: formData.region?.map((region) => {
        return region.label
      }),
      notes: formData.notes,
      tags: formData.tags?.map((tag) => {
        return tag.label
      })
    }

    setIsEditing(false)
    mutate(data, {
      onSuccess(mutatedDocId, _variables, _context) {
        if (isNewContact) router.replace(`/contact/${mutatedDocId}`)
      }
    })
  }

  return (
    <div className='mx-auto flex w-screen flex-col justify-center gap-4 p-4'>
      <div className='flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 p-4'>
        <Avatar
          image=''
          height={48}
          width={48}
          iconClass='w-32 rounded-full bg-white hover:bg-gray-200 hover:cursor-pointer'
        />
        <div className='w-full border border-b-gray-300' />
        <Form<ContactFormValues>
          className='w-full'
          onSubmit={submitForm}
          defaultValues={
            contact
              ? {
                  name: contact.name,
                  desc: contact.desc,
                  pets: contact.pets,
                  email: contact.email,
                  phone: contact.phone,
                  streetAddress: contact.streetAddress,
                  region: contact.region.map((region) => {
                    return { label: region, value: region }
                  }),
                  notes: contact.notes,
                  tags: contact.tags.map((tag) => {
                    return { label: tag, value: tag }
                  })
                }
              : {}
          }
        >
          <div className='flex flex-col gap-4 p-4'>
            <TextField
              label='Full Name'
              name='name'
              rules={validationSchema.name}
            />

            <TextField
              label='Description'
              name='desc'
              rules={validationSchema.desc}
            />
            <TextField
              label='Phone Number'
              name='phone'
              type='tel'
              rules={validationSchema.phone}
            />
            <TextField
              label='Email'
              name='email'
              rules={validationSchema.email}
            />
            <TextField
              label='Address'
              name='streetAddress'
              rules={validationSchema.streetAddress}
            />
            <CreateSelect<SelectOption<string>, true>
              label='Tags'
              name='tags'
              rules={validationSchema.tags}
              isMulti
              isSearchable
            />
            <CreateSelect<SelectOption<string>, true>
              label='Region'
              name='region'
              rules={validationSchema.region}
              isMulti
              isSearchable
            />

            <TextField label='Pets' name='pets' rules={validationSchema.pets} />

            <TextField
              label='Notes'
              type='textarea'
              name='notes'
              placeholder='Add notes here'
              rules={validationSchema.notes}
            />
            {/* FORM BUTTONS */}
            <div className=' flex justify-center gap-2'>
              <Button type='submit' fullwidth>
                Save
              </Button>
              {!isNewContact ? (
                <Button
                  intent='secondary'
                  fullwidth
                  onClick={() => {
                    setIsEditing(false)
                  }}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  intent='secondary'
                  type='button'
                  fullwidth
                  onClick={() => {
                    router.push('/contact')
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export type SubmittedContactFormValues = keyof ContactFormValues

export default ContactForm
