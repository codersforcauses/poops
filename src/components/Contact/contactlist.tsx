import { useContext } from 'react'

import ContactItem from '@/components/Contact/contactitem'
import { ContactContext } from '@/pages/contact'

type ContactsProp = {
  firestoreIndexMap: number[]
}

const ContactList = ({ firestoreIndexMap }: ContactsProp) => {
  const allContacts = useContext(ContactContext).allContacts
  const contactItems = firestoreIndexMap.map((firestoreIndex) => {
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
      <ul>{contactItems}</ul>
    </div>
  )
}

export default ContactList
