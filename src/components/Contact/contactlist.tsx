import { Dispatch, SetStateAction } from 'react'

import ContactItem from '@/components/Contact/contactitem'
import type { Contact } from '@/types/types'

type ContactsProp = {
  contacts: Contact[]
  setDisplayContact: Dispatch<SetStateAction<Contact | null>>
  displayContact: Contact | null
}

const ContactList = ({ contacts, setDisplayContact }: ContactsProp) => {
  const contactItems = contacts.map((contact) => {
    return (
      <ContactItem
        contact={contact}
        image=''
        key={contact.id}
        setDisplayContact={setDisplayContact}
      />
    )
  })

  return (
    <div className='mt-1 flex-col'>
      <ul>{contactItems}</ul>
    </div>
  )
}

export default ContactList
