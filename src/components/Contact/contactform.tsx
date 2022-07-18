import React, { useEffect } from 'react'
import { Dispatch, SetStateAction, useState } from 'react'
import { PlusIcon, XIcon } from '@heroicons/react/outline'
import tw from 'tailwind-styled-components'
import { v4 as uuidv4 } from 'uuid'

import Avatar from '@/components/Contact/avatar'
import RegionSelector from '@/components/Contact/regiondropdown'
import TagSelector from '@/components/Contact/tagdropdown'
import type { ContactData, Pet } from '@/types/types'

type ContactInfoProps = {
  contact: ContactData
  image: string
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const ContactForm = ({ contact, image, setIsEditing }: ContactInfoProps) => {
  const [pets, setPets] = useState<Pet[]>(contact.pets)
  const [regions, setRegions] = useState(contact.region)
  const [tags, setTags] = useState(contact.tags)
  const [contactForm, setContactForm] = useState(contact)

  function addPet() {
    const newPetField = {
      id: uuidv4(),
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
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const updatedPet = pets[petIndex]
    updatedPet[name as keyof Pet] = value
    // Only set the updated pet but keep the other existing pets
    setPets([
      ...pets.slice(0, petIndex),
      updatedPet,
      ...pets.slice(petIndex + 1, pets.length)
    ])
  }

  useEffect(() => {
    setContactForm((contactForm) => ({
      ...contactForm,
      tags: tags,
      region: regions,
      pets: pets
    }))
  }, [regions, pets, tags])

  // TODO: Submit ContactForm to database
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: submit to firestore here
    setIsEditing(false)

    // TODO: reload page here
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
          <label htmlFor={contact.displayName} className='text-dark-red'>
            First Name
          </label>
          <input
            name='first_name'
            defaultValue={contact.displayName}
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
        <Box>
          <label htmlFor='tags' className='text-dark-red'>
            Tags
          </label>

          <TagSelector tags={contact.tags} setTags={setTags} />

          {/* This should be done as a react component i think? */}
          {/* Padding to counter the shadow */}
          <div className='pt-2'></div>
        </Box>
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
                  className='mb-2 w-full rounded-lg border border-gray-300 pl-1'
                  onChange={(e) => handlePetChange(i, e)}
                />

                <label htmlFor={pet.notes} className='text-dark-red'>
                  Notes
                </label>
                <textarea
                  name='notes'
                  defaultValue={pet.notes}
                  className='mb-2 w-full rounded-lg border border-gray-300 pl-1'
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
            <button
              type='button'
              className='w-80 rounded bg-gray-300 py-1 font-bold text-black hover:bg-gray-300'
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
    bg-gray-300
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
