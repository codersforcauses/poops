import Link from 'next/link'

import ContactItem from '@/components/Contact/contactitem'
import type { Contact } from '@/types/types'

type ContactsProp = {
  contacts: Contact[]
}

const ContactList = ({ contacts }: ContactsProp) => {
  const contactItems = contacts.map((contact) => {
    return (
      <Link href={`/contact/${contact.id}`} key={contact.id}>
        <a>
          <ContactItem contact={contact} image='' />
        </a>
      </Link>
    )
  })

  return (
    <div className='flex-col'>
      <ul>{contactItems}</ul>
    </div>
  )
}

export default ContactList
