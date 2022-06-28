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

const ContactList = ({ contacts }) => {
  const contactsItems = []

  for (let i = 0; i < contacts.length; i++) {
    contactsItems.push(
      <ContactItem
        key={contacts[i].id}
        userid={contacts[i].id}
        image={contacts.image}
        name={`${contacts[i].first_name} ${contacts[i].last_name}`}
      />
    )
  }
  console.log(`contactsItems len: ${contactsItems.length}`)

  return (
    <>
      <div className='m-auto max-w-md flex-col items-center'>
        <div className='flow-root'>
          <ul>{contactsItems}</ul>
        </div>
      </div>
    </>
  )
}

export default ContactList
