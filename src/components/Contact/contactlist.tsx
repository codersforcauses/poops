import { XCircleIcon } from '@heroicons/react/24/outline'

import ContactItem from '@/components/Contact/contactitem'
import { useContact } from '@/context/ContactContext/context'

type ContactsProp = {
  firestoreIndexMap: number[]
}

const ContactList = ({ firestoreIndexMap }: ContactsProp) => {
  const { allContacts } = useContact()

  firestoreIndexMap.sort((a: number, b: number) => {
    const nameA = allContacts[a].clientName.toUpperCase() // ignore upper and lowercase
    const nameB = allContacts[b].clientName.toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    // names must be equal
    return 0
  })

  const contactItems = firestoreIndexMap.map((firestoreIndex) => (
    <ContactItem
      firestoreIndex={firestoreIndex}
      contact={allContacts[firestoreIndex]}
      image=''
      key={firestoreIndex}
    />
  ))

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
