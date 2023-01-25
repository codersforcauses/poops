import { ReactElement } from 'react'

import ContactForm from '@/components/Contact/ContactForm'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import { useMutateContacts } from '@/hooks/contacts'
import { NextPageWithLayout } from '@/pages/_app'

const NewContact: NextPageWithLayout = () => {
  const { mutate: mutateContacts } = useMutateContacts()

  return (
    <div className='main-style'>
      <h1 className='m-3 text-center text-2xl'>Add Contact</h1>
      <ContactForm
        contact={{
          name: '',
          desc: '',
          pets: '',
          email: '',
          phone: '',
          streetAddress: '',
          region: [],
          notes: '',
          tags: ['Client']
        }}
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
