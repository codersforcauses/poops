import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  UserCircleIcon,
  XIcon
} from '@heroicons/react/outline'
import tw from 'tailwind-styled-components'

import type { Contact, Pet } from '@/types/types'
type ContactInfoProps = {
  contact: Contact
  image: string
  setIsEditing: (value: boolean) => void
}

const ContactForm = ({ contact, image, setIsEditing }: ContactInfoProps) => {
  const [pets, setPets] = useState<Pet[]>(contact.pets)
  const [contactForm, setContactForm] = useState(contact)

  function addPet() {
    const newPetField = {
      name: '',
      notes: ''
    }
    setPets((pets) => [...pets, newPetField])
  }

  const removePet = (pet: Pet) => {
    setPets([...pets.filter((p) => p.name !== pet.name)])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setContactForm({...contactForm, [name]: value, })
  }
  // Bug: Doesn't capture last character for last entered pet details in setContactForm, however the pet state updates correctly
  const handlePetChange = (petIndex:number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newPets = pets.map((p,i) => i === petIndex
     ? {
      ...p,
      [name]: value,
      } : p,
    )
    setPets(newPets)
    setContactForm({...contactForm, pets: pets})
    }

  // TODO: Submit Form to database
  const submitForm = () => {
    console.log("SUBMITNG", contactForm)
  }

  return (
    <form>
      <div className='flex flex-col items-center justify-center gap-3'>
        {image === '' ? (
          <UserCircleIcon className='w-32 rounded-full' />
        ) : (
          <Image
            className='h-2 w-2 rounded-full'
            src={image}
            alt='Neil image'
            width={48}
            height={48}
            layout='fixed'
          />
        )}
        {/* FIRST AND LAST NAME */}
        <Box>
          <label htmlFor={contact.first_name} className='text-dark-red'>
            First Name
          </label>
          <input
            name="first_name"
            defaultValue={contact.first_name}
            className='mb-2 w-80 rounded-lg border border-grey pl-1'
            onChange={handleInputChange}
          />
        </Box>
        <Box>
          <label htmlFor={contact.last_name} className='text-dark-red'>
            Last Name
          </label>
          <input
            name="last_name"
            defaultValue={contact.last_name}
            className='w-80 rounded-lg border border-grey pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* DESCRIPTION */}
        <Box>
          <label htmlFor={contact.notes} className='text-dark-red'>
            Description
          </label>
          <input
            name="desc"
            defaultValue={contact.desc}
            className='w-80 rounded-lg border border-grey pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* PHONE */}
        <Box>
          <div className='flex w-full justify-between'>
            <label htmlFor={contact.phone} className='text-dark-red'>
              Phone
            </label>
            <a href={`tel:${contact.phone}`}>
              <PhoneIcon className='h-5 w-5' />
            </a>
          </div>
          <input
            name="phone"
            defaultValue={contact.phone}
            className='w-full rounded-lg border border-grey pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* EMAIL */}
        <Box>
          <div className='flex w-full justify-between'>
            <label htmlFor={contact.email} className='text-dark-red'>
              Email
            </label>
            <a
              href={`mailto:${contact.email}`}
              target='_blank'
              rel='noreferrer'
            >
              <MailIcon className='h-5 w-5' />
            </a>
          </div>
          <input
            name="email"
            defaultValue={contact.email}
            className='w-full rounded-lg border border-grey pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* ADDRESS */}
        <Box>
          <div className='flex w-full justify-between'>
            <label htmlFor={contact.street_address} className='text-dark-red'>
              Address
            </label>
            <a
              href={`http://maps.google.com/?q=${contact.street_address}`}
              target='_blank'
              rel='noreferrer'
            >
              <LocationMarkerIcon className='h-5 w-5' />
            </a>
          </div>
          <input
            name="street_address"
            defaultValue={contact.street_address}
            className='w-full rounded-lg border border-grey pl-1'
            onChange={handleInputChange}
          />
        </Box>
        {/* TAGS */}
        <Box>
          <div className='flex w-full justify-between'>
            <label htmlFor='tags' className='text-dark-red'>
              Tags
            </label>
            <PlusIcon className='h-5 w-5' />
          </div>
          <TagHolder className='mt-1'>
            <br />{' '}
          </TagHolder>
          {/* This should be done as a react component i think? */}
          {/* Padding to counter the shadow */}
          <div className='pt-2'>
            <label>
              <input type='checkbox' /> Client
            </label>
            <br />
            <label>
              <input type='checkbox' /> Coordinator
            </label>
            <br />
            <label>
              <input type='checkbox' /> Volunteer
            </label>
          </div>
        </Box>
        {/* REGIONS */}
        <Box className='pb-3'>
          <label htmlFor='regions' className='text-dark-red'>
            Region{' '}
          </label>
          <TagHolder className='mt-1'>
            <Tag>hello</Tag>
            <Tag>hi</Tag>
          </TagHolder>
        </Box>
        <Box>
          <label htmlFor='pets' className='text-dark-red'>
            Pets
          </label>
          {/* TODO: Add Key for pet, It can't be i */}
          {pets.map((pet, i) => (
            <div>
              <PetContainer className='py-1'>
                <div className='flex w-full justify-between'>
                  <label htmlFor={pet.name} className='text-dark-red'>
                    Name
                  </label>
                  <button type='button' onClick={() => removePet(pet)}>
                    <XIcon className='h-5 w-5 text-dark-red' />
                  </button>
                </div>
                <input
                  name="name"
                  defaultValue={pet.name}
                  className='mb-2 w-full rounded-lg border border-grey pl-1'
                  onChange={(e) => handlePetChange(i, e)}
                />

                <label htmlFor={pet.notes} className='text-dark-red'>
                  Notes
                </label>
                <input
                  name="notes"
                  defaultValue={pet.notes}
                  className='mb-2 w-full rounded-lg border border-grey pl-1'
                  onChange={(e) => handlePetChange(i, e)}
                />
              </PetContainer>
            </div>
          ))}
          {/* Plus icon that adds a new pet container */}
          <div className='flex justify-center'>
            <button type='button' onClick={addPet}>
              <PlusIcon className='h-7 w-7 rounded-full bg-white p-1 text-dark-red' />
            </button>
          </div>
        </Box>
        {/* NOTES */}
        <Box>
          <label htmlFor={contact.notes} className='text-dark-red'>
            Notes
          </label>
          <textarea
            name="notes"
            defaultValue={contact.notes}
            className='w-full rounded-lg border border-grey'
            onChange={handleInputChange}
          />
        </Box>
        {/* FORM BUTTONS */}
        <div className='mb-3 flex justify-center'>
          <div className='flex flex-col space-y-1'>
            <button
              type='button'
              className='w-80 rounded bg-primary py-1 font-bold text-white hover:bg-dark-red'
              onClick={submitForm}//setIsEditing(false)}
            >
              Save
            </button>
            <button
              type='button'
              className='w-80 rounded bg-grey py-1 font-bold text-black hover:bg-grey'
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ContactForm

const Box = tw.div`
    bg-grey
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

const PetContainer = tw.div`
  px-2
  my-2
  bg-white
  rounded-2xl
`
