import { useNavigate } from 'react-router-dom'

import ContactForm from '@/components/Contact/contactform'
import Header from '@/components/Header'
import type { Contact } from '@/types/types'

import Button from '../../components/Button/Button_component'

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
  const navigate = useNavigate()
  return (
    <>
      <Header pageTitle={`${contact.firstName} ${contact.lastName}`} />

      <div className='sticky top-0 z-50 w-full bg-white'>
        <div className='m-auto flex h-14 max-w-md flex-row'>
          <div className='m-auto flex-1 text-center'>
            <Button
              buttonlabel='Back'
              handler={() => navigate(-1)}
              attribute='rounded bg-primary py-1 px-4 font-bold text-white hover:bg-dark-red'
            />
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
