import { XCircleIcon } from '@heroicons/react/24/outline'

import ContactItem from '@/components/Contact/contactitem'
import { useContacts } from '@/hooks/contacts'

const ContactList = () => {
  const { data: contacts } = useContacts()
  if (contacts === undefined) return null

  const contactItems = contacts
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((contact) => <ContactItem key={contact.docId} contact={contact} />)

  return (
    <div>
      {contactItems.length > 0 ? (
        <ul>{contactItems}</ul>
      ) : (
        <div className='mt-12 flex flex-col items-center gap-2'>
          <XCircleIcon className='h-16 w-16' />
          <p>You don&apos;t have any contacts yet. Add some!</p>
        </div>
      )}
    </div>
  )
}

export default ContactList
