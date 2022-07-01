import { GetStaticPaths, GetStaticProps } from 'next'
import router from 'next/router'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import ContactInfo from '@/components/Contact/contactInfo'
import type { Contact } from '@/types/types'

type contactProp = {
  contact: Contact
}
const Contact = ({ contact }: contactProp) => {
  return (
    <>
      <div className='mx-auto w-96'>
        <button
          type='button'
          onClick={() => router.back()}
          className='my-1  rounded bg-poops-red py-2 px-4 font-bold text-white hover:bg-poops-dark-red'
        >
          Back
        </button>
      </div>
      <ContactInfo contact={contact} image='' />
    </>
  )
}

// TODO: Update to getServerSideProps when API is created
export const getStaticPaths: GetStaticPaths = () => {
  const paths = CONTACT_DATA.map((contact) => {
    return { params: { id: contact.id.toString() } }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = (context: any) => {
  const id = context.params.id
  const contact = CONTACT_DATA.find((contact) => contact.id === id)
  return {
    props: {
      contact
    }
  }
}

export default Contact
