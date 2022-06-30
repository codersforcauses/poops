import { GetStaticPaths, GetStaticProps } from 'next'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import ContactInfo from '@/components/Contact/contactInfo'
import type { Contact } from '@/types/types'

type contactProp = {
  contact: Contact
}
const Contact = ({ contact }: contactProp) => {
  return (
    <>
      <ContactInfo contact={contact} />
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
