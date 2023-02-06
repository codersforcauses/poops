import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import ContactForm from '@/components/Contact/ContactForm'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import Spinner from '@/components/UI/loadingSpinner'
import { useContacts, useMutateContacts } from '@/hooks/contacts'
import { NextPageWithLayout } from '@/pages/_app'

const Contact: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: contacts, isLoading } = useContacts()
  const { mutate: mutateContacts } = useMutateContacts()

  if (isLoading)
    return (
      <div className='flex h-20 items-center justify-center'>
        <Spinner style='h-10 w-10 fill-primary-dark text-gray-200' />
      </div>
    )

  const { id } = router.query

  if (contacts === undefined || id === undefined || Array.isArray(id))
    return null

  const contact = contacts.find((contact) => contact.docId === id)

  if (contact === undefined) return null

  return (
    <div className='main-style'>
      <ContactForm contact={contact} mutate={mutateContacts} />
    </div>
  )
}

const ProfileWithProtected = withProtected(Contact)

ProfileWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Profile'>{page}</Layout>
)

export default ProfileWithProtected
