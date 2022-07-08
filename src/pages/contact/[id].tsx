import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { PencilIcon } from '@heroicons/react/outline'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import PROFILE_DATA from '@/../mockData/PROFILE_DATA.json'
import ContactForm from '@/components/Contact/contactform'
import ContactInfo from '@/components/Contact/contactinfo'
import Header from '@/components/Header'
import type { Contact } from '@/types/types'

type ContactProp = {
  contact: Contact
}

const Contact = ({ contact }: ContactProp) => {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <>
      <Header pageTitle={`${contact.first_name} ${contact.last_name}`} />
      <div className='sticky top-0 z-50 w-full bg-white'>
        <div className='mx-auto flex w-80 justify-between py-2'>
          <Link href='/contact'>
            <button
              type='button'
              className='rounded bg-primary py-1 px-4 font-bold text-white hover:bg-dark-red'
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
      </div>
      {!isEditing ? (
        <ContactInfo contact={contact} image='' />
      ) : (
        <ContactForm contact={contact} image='' setIsEditing={setIsEditing} />
      )}
    </>
  )
}

// TODO: Update to getServerSideProps when API is created
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [PROFILE_DATA].concat(CONTACT_DATA).map((contact) => {
    return { params: { id: contact.id.toString() } }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const contact = [PROFILE_DATA]
    .concat(CONTACT_DATA)
    .find((contact) => contact.id === id)
  return {
    props: {
      contact
    }
  }
}

export default Contact
