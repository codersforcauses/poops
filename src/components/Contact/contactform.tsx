import React from 'react'
import { Dispatch, SetStateAction, useState } from 'react'
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
  setIsEditing: Dispatch<SetStateAction<boolean>>
}
import RegionSelector from '@/components/Contact/regiondropdown'
import TagSelector from '@/components/Contact/tagdropdown'

const ContactForm = ({ contact, image, setIsEditing }: ContactInfoProps) => {
  const [pets, setPets] = useState<Pet[]>(contact.pets)
  const [contactForm, setContactForm] = useState(contact)

  function addPet() {
    const newPetField = {
      id: Math.random().toString().substring(2, 8),
      name: '',
      notes: ''
    }
    setPets((pets) => [...pets, newPetField])
  }

  const removePet = (pet: Pet) => {
    setPets([...pets.filter((p) => p.name !== pet.name)])
  }

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setContactForm({ ...contactForm, [name]: value })
  }

  const handlePetChange = (
    petIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    const newPets = pets.map((pet, i) =>
      i === petIndex
        ? {
            ...pet,
            [name]: value
          }
        : pet
    )
    setPets(newPets)
    setContactForm({ ...contactForm, pets: newPets })
  }

  // TODO: Submit ContactForm to database
  // Make sure contact info has the updated data
  const submitForm = () => {
    setIsEditing(false)
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
            name='first_name'
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
            name='last_name'
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
            name='desc'
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
            name='phone'
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
            name='email'
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
            name='street_address'
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

          <TagSelector tags={contact.tags} />

          {/* This should be done as a react component i think? */}
          {/* Padding to counter the shadow */}
          <div className='pt-2'></div>
        </Box>
        {/* REGIONS */}
        <Box className='pb-3'>
          <label htmlFor='regions' className='text-dark-red'>
            Region
          </label>
          <RegionSelector regions={contact.region} />
        </Box>
        <Box>
          <label htmlFor='pets' className='text-dark-red'>
            Pets
          </label>
          {pets.map((pet, i) => (
            <div key={pet.id}>
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
                  name='name'
                  defaultValue={pet.name}
                  className='mb-2 w-full rounded-lg border border-grey pl-1'
                  onChange={(e) => handlePetChange(i, e)}
                />

                <label htmlFor={pet.notes} className='text-dark-red'>
                  Notes
                </label>
                <input
                  name='notes'
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
            name='notes'
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
              onClick={submitForm} //setIsEditing(false)}
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

const PetContainer = tw.div`
  px-2
  my-2
  bg-white
  rounded-2xl
`
