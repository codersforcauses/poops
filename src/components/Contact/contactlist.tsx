import { XCircleIcon } from '@heroicons/react/outline'

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

  const contactItems = firestoreIndexMap.map((firestoreIndex) => {
    if (firestoreIndex === 0) return
    return (
      <ContactItem
        firestoreIndex={firestoreIndex}
        contact={allContacts[firestoreIndex]}
        image=''
        key={firestoreIndex}
      />
    )
  })

  return (
    <div className='h-full flex-col'>
      {firestoreIndexMap.includes(0) && (
        <ul>
          <ContactItem
            firestoreIndex={0}
            contact={allContacts[0]}
            image=''
            key={0}
          />
        </ul>
      )}
      {contactItems.length > 0 ? (
        <ul>{contactItems}</ul>
      ) : (
        <div className='flex h-full -translate-y-16 flex-col items-center justify-center'>
          <XCircleIcon className='h-16 w-16 content-center' />
          <p>You have no contacts yet. Add some!</p>
        </div>
      )}
    </div>
  )
}

export default ContactList
