import MOCK_DATA from '@/../mockData/MOCK_DATA.json'
import ContactList from '@/components/Contact/contactlist'
import Seo from '@/components/Header'

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

const Contact = () => {
  return (
    <>
      {/* <Seo /> */}
      <Seo pageTitle='Contact' />

      <main>
        <h1 className='m-3 text-center text-2xl'>Contacts</h1>
        <ContactList contacts={MOCK_DATA} />
      </main>
    </>
  )
}

export default Contact
