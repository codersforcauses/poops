import Link from 'next/link'

import ContactItem from '@/components/Contact/contactitem'
import type { Contact } from '@/types/types'

type contactsProp = {
  contacts: Contact[]
}

const ContactList = ({ contacts }: contactsProp) => {
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
