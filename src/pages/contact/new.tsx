import { ReactElement } from 'react'

import ContactForm from '@/components/Contact/contactform'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import { useMutateContacts } from '@/hooks/contacts'
import { NextPageWithLayout } from '@/pages/_app'

const NewContact: NextPageWithLayout = () => {
  const { mutate: mutateContacts } = useMutateContacts()

  const newContact = {
    name: '',
    desc: '',
    pets: '',
    email: '',
    phone: '',
    streetAddress: '',
    region: [],
    notes: '',
    tags: ['Client']
  }

  return (
    <div className='main-style'>
      <ContactForm
        contact={newContact}
        isNewContact={true}
        mutate={mutateContacts}
      />
    </div>
  )
}

const NewContactWithProtected = withProtected(NewContact)

NewContactWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Profile'>{page}</Layout>
)

export default NewContactWithProtected
