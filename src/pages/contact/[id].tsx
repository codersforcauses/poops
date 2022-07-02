import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { PencilIcon } from '@heroicons/react/outline'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import ContactInfo from '@/components/Contact/contactinfo'
import Header from '@/components/Header'
import type { Contact } from '@/types/types'

type contactProp = {
  contact: Contact
}

const Contact = ({ contact }: contactProp) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <Header pageTitle={`${contact.first_name} ${contact.last_name}`} />
      <div className='m-2 mx-auto flex w-96 justify-between'>
        <Link href='/contact'>
          <button
            type='button'
            className='rounded bg-primary py-2 px-4 font-bold text-white hover:bg-dark-red'
          >
            Back
          </button>
        </Link>
        {!isEditing && (
          <PencilIcon
            className='flex h-7 w-7 justify-end'
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>
      <ContactInfo contact={contact} image='' isEditing={isEditing} />
      <div className='my-3 flex justify-center'>
        {isEditing && (
          <button
            type='button'
            className='bg-poops-red w-80 rounded font-bold text-white hover:bg-dark-red'
            onClick={() => setIsEditing(false)}
          >
            {' '}
            Save
          </button>
        )}
      </div>
    </>
  )
}

// TODO: Update to getServerSideProps when API is created
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = CONTACT_DATA.map((contact) => {
    return { params: { id: contact.id.toString() } }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const contact = CONTACT_DATA.find((contact) => contact.id === id)
  return {
    props: {
      contact
    }
  }
}

export default Contact
