import { Dispatch, SetStateAction } from 'react'

import ContactItem from '@/components/Contact/contactitem'
import type { Contact } from '@/types/types'

type ContactsProp = {
  allContacts: Contact[]
  firestoreIndexMap: number[]
  setDisplayContact: Dispatch<
    SetStateAction<null | {
      firestoreIndex: number
      contact: Contact
    }>
  >
}

const ContactList = ({
  allContacts,
  firestoreIndexMap,
  setDisplayContact
}: ContactsProp) => {
  const contactItems = firestoreIndexMap.map((firestoreIndex) => {
    return (
      <ContactItem
        contact={allContacts[firestoreIndex]}
        firestoreIndex={firestoreIndex}
        image=''
        key={firestoreIndex}
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
