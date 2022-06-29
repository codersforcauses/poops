import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import { GetStaticProps } from 'next'

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
const Contact = ({contact}: contactProp) => {
  return (
    <div>{contact.first_name}</div>
  )
}

export const getStaticPaths = () =>{
  const paths = CONTACT_DATA.map(contact => {
    return {params: {id: contact.id.toString()}}
  })
  return {
    paths,
    fallback: false,
  }}

  export const getStaticProps = (context:any) => {
    const id = context.params.id;
    const contact = CONTACT_DATA.find(contact => {
      if(contact.id === id) {
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

