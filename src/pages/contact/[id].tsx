import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import ContactInfo from '@/components/Contact/contactinfo'
import Header from '@/components/Header'
import type { Contact } from '@/types/types'

type contactProp = {
  contact: Contact
}

const Contact = ({ contact }: contactProp) => {
  return (
    <>
      <Header pageTitle={`${contact.first_name} ${contact.last_name}`} />
      <div className='mx-auto w-96'>
        <Link href='/contact'>
          <button
            type='button'
            className='m-2 rounded bg-poops-red py-2 px-4 font-bold text-white hover:bg-poops-dark-red'
          >
            Back
          </button>
        </Link>
      </div>
      <ContactInfo contact={contact} image='' />
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
