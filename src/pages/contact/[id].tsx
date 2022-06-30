import { GetStaticPaths, GetStaticProps } from 'next'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import ContactInfo from '@/components/Contact/contactInfo'

type contactData = {
  id: string
  first_name: string
  last_name: string
  pets: string
  email: string
  phone: string
  street_address: string
  region: string
  notes: string
}

type contactProp = {
  contact: contactData
}
const Contact = ({ contact }: contactProp) => {
  return (
    <>
      <ContactInfo id={contact.id} />
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
  const contact = CONTACT_DATA.find((contact) => {
    if (contact.id === id) {
      return contact
    }
  })
  return {
    props: {
      contact
    }
  }
}

export default Contact
