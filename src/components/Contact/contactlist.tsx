import ContactItem from '@/components/Contact/contactitem'

const ContactList = (contactData: []) => {
  // const contactsItems = contactData.map((contact) => {
  //   return <ContactItem name={contact.name} />
  // })

  return (
    <>
      <div className='m-auto max-w-md flex-col items-center'>
        <div className='flow-root'>
          <ul>
            {/* {contactsItems} */}
            <ContactItem name='Zach Manson' />
            <ContactItem name='John Doe' />
            <ContactItem name='Jane Doe' />
          </ul>
        </div>
      </div>
    </>
  )
}

export default ContactList
