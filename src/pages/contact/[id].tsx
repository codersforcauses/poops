import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PencilIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import PROFILE_DATA from '@/../mockData/PROFILE_DATA.json'
import ContactForm from '@/components/Contact/contactform'
import ContactInfo from '@/components/Contact/contactinfo'
import Header from '@/components/Header'
import type { Contact } from '@/types/types'

import Button from '../../components/Button/Button_component'

type ContactProp = {
  contact: Contact
}

const Contact = ({ contact }: ContactProp) => {
  const [isEditing, setIsEditing] = useState(false)

  const navigate = useNavigate()

  return (
    <>
      <Header pageTitle={`${contact.firstName} ${contact.lastName}`} />

      <div className='sticky top-0 z-50 w-full bg-white'>
        <div className='m-auto flex h-14 max-w-md flex-row'>
          <div className='m-auto flex-1 text-center'>
            <Button
              buttonlabel='Back'
              handler={() => navigate(-1)}
              attribute='rounded bg-primary py-1 px-4 font-bold text-white hover:bg-dark-red'
            />
          </div>
          <div className='flex-1'></div>
          <div className='m-auto flex-1'>
            {!isEditing && (
              <PencilIcon
                className='m-auto flex h-7 w-7 cursor-pointer'
                onClick={() => setIsEditing(true)}
              />
            )}
          </div>
        </div>
      </div>

      {!isEditing ? (
        <ContactInfo contact={contact} image='' />
      ) : (
        <ContactForm
          contact={contact}
          image=''
          setIsEditing={setIsEditing}
          isNewContact={false}
        />
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
  // TODO: Get profile and contact data from server
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
