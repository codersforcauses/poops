import { useRouter } from 'next/router'
import { UseMutateFunction } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'

import Avatar from '@/components/Contact/avatar'
import validationSchema from '@/components/Contact/ContactForm/validation'
import NavButtons from '@/components/Contact/navbuttons'
import Form from '@/components/UI/FormComponents/Form'
import {
  CreateSelect,
  CustomSelect
} from '@/components/UI/FormComponents/SelectFields'
import TextField from '@/components/UI/FormComponents/TextField'
import { Contact, SelectOption } from '@/types/types'
import { regionOptions, roleTypes } from '@/utils/defaults'

import Button from '../../UI/button'

interface ContactFormProps {
  contact: Contact
  isNewContact?: boolean
  mutate: UseMutateFunction<
    unknown,
    unknown,
    Contact | { docId?: string },
    unknown
  >
}

interface FormValues {
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

  const submitForm: SubmitHandler<FormValues> = (formData) => {
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

    mutate(data, {
      onSuccess(mutatedDocId, _variables, _context) {
        if (isNewContact) router.replace(`/contact/${mutatedDocId}`)
      }
    })

    router.back()
  }

  return (
    // Padding
    <div className='container mx-auto p-4'>
      {/* Grey area for form card */}
      <div className='flex-col gap-4 rounded-lg bg-gray-100 p-4'>
        {/* Nav and avatar */}
        <div className='flex w-full flex-col items-center justify-center gap-2'>
          <NavButtons />
          <Avatar
            image=''
            height={48}
            width={48}
            iconClass='w-32 rounded-full bg-white'
          />
        </div>
        <div className='w-full border border-b-gray-300' />
        <Form<FormValues>
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
              options={roleTypes}
              rules={validationSchema.tags}
              isMulti
              isSearchable
            />
            <CustomSelect<SelectOption<string>, true>
              label='Region'
              name='region'
              options={regionOptions}
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
        </Form>
      </div>
    </div>
  )
}

export type ContactFormValues = keyof FormValues

export default ContactForm
