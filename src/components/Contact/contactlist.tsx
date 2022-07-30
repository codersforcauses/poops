import { useContext } from 'react'

import ContactItem from '@/components/Contact/contactitem'
import { ContactContext } from '@/pages/contact'
import { Contact } from '@/types/types'

type ContactsProp = {
  firestoreIndexMap: number[]
}

const ContactList = ({ firestoreIndexMap }: ContactsProp) => {
  const allContacts = useContext(ContactContext).allContacts

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
    <div className='flex-col'>
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
      <ul>{contactItems}</ul>
    </div>
  )
}

export default ContactList
