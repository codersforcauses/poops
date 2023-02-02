import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { PencilIcon } from '@heroicons/react/24/outline'

import ContactInfo from '@/components/Contact/contactinfo'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
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
      <div className='my-4 mx-6 flex h-14 flex-row justify-between'>
        <div className='text-center'>
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
        <div>
          <PencilIcon
            className='m-auto flex h-7 w-7 cursor-pointer'
            onClick={() => router.push(`/contact/${contact.docId}/edit`)}
          />
        </div>
      </div>
      <ContactInfo contact={contact} mutate={mutateContacts} />
    </div>
  )
}

const ProfileWithProtected = withProtected(Contact)

ProfileWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Profile'>{page}</Layout>
)

export default ProfileWithProtected
