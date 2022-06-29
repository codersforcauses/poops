import ContactItem from '@/components/Contact/contactitem'

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

type contactsProp = {
  contacts: contactData[]
}

const ContactList = ({ contacts }: contactsProp) => {
  const contactItems = contacts.map((contact) => {
    return <ContactItem key={contact.id} contact={contact} image='' />
  })

  return (
    <>
      <div className='flex-col'>
        <div className='flow-root'>
          <ul>{contactItems}</ul>
        </div>
      </div>
    </>
  )
}

export default ContactList
