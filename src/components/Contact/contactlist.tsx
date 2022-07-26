import ContactItem from '@/components/Contact/contactitem'

type ContactsProp = {
  firestoreIndexMap: number[]
}

const ContactList = ({ firestoreIndexMap }: ContactsProp) => {
  console.log('firestoreIndexMap:', firestoreIndexMap)
  const contactItems = firestoreIndexMap.map((firestoreIndex) => {
    return (
      <ContactItem
        firestoreIndex={firestoreIndex}
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
