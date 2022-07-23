import Link from 'next/link'

import ContactForm from '@/components/Contact/contactform'
import Header from '@/components/Header'
import type { Contact } from '@/types/types'

const Contact = () => {
  const contact: Contact = {
    id: '',
    firstName: '',
    lastName: '',
    desc: '',
    pets: '',
    email: '',
    phone: '',
    streetAddress: '',
    region: [],
    notes: '',
    tags: []
  }

  return (
    <>
      <Header pageTitle={`${contact.firstName} ${contact.lastName}`} />

      <div className='sticky top-0 z-50 w-full bg-white'>
        <div className='m-auto flex h-14 max-w-md flex-row'>
          <div className='m-auto flex-1 text-center'>
            <Link href='/contact'>
              <button
                type='button'
                className='rounded bg-primary py-1 px-4 font-bold text-white hover:bg-dark-red'
              >
                Back
              </button>
            </Link>
          </div>
          <div className='flex-1'></div>
          <div className='flex-1'></div>
        </div>
      </div>

      <ContactForm
        contact={contact}
        image=''
        setIsEditing={undefined}
        isNewContact={true}
      />
    </>
  )
}

export default Contact
