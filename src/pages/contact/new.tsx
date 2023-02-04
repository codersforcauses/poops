import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import ContactForm from '@/components/Contact/ContactForm'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import { useMutateContacts } from '@/hooks/contacts'
import { NextPageWithLayout } from '@/pages/_app'

const NewContact: NextPageWithLayout = () => {
  const { mutate: mutateContacts } = useMutateContacts()
  const router = useRouter()

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
      <div className='my-4 ml-6 h-14 w-max text-center'>
        <Button
          type='button'
          size='medium'
          onClick={() => {
            router.back()
          }}
        >
          Back
        </Button>
      </div>

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
