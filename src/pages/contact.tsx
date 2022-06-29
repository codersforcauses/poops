import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import ContactList from '@/components/Contact/contactlist'
import Seo from '@/components/Header'

const Contact = () => {
  return (
    <>
      {/* <Seo /> */}
      <Seo pageTitle='Contact' />

      <main>
        <h1 className='m-3 text-center text-2xl'>Contacts</h1>
        <ContactList contacts={CONTACT_DATA} />
      </main>
    </>
  )
}

export default Contact
