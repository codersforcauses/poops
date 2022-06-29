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


const ContactList = ({ contacts }: any) => {
  const contactItems = contacts.map((contact:any) => {
    return (
      <ContactItem userid={contact.id} image={contact.image} name={`${contact.first_name} ${contact.last_name}`}/>
    )
    
  })

  return (
    <>
      <div className='m-auto max-w-md flex-col items-center'>
        <div className='flow-root'>
          <ul>{contactItems}</ul>
        </div>
      </div>
    </>
  )
}

export default ContactList
