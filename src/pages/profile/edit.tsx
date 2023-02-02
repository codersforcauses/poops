import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import ContactForm from '@/components/Contact/contactform'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import Spinner from '@/components/UI/loadingSpinner'
import useUser, { useMutateUser } from '@/hooks/user'
import { NextPageWithLayout } from '@/pages/_app'

const Profile: NextPageWithLayout = () => {
  const { data, isLoading } = useUser()
  const { mutate: mutateUser } = useMutateUser()
  const router = useRouter()

  if (isLoading)
    return (
      <div className='flex h-20 items-center justify-center'>
        <Spinner style='h-10 w-10 fill-primary-dark text-gray-200' />
      </div>
    )

  if (data === undefined) return null

  const user = data.info

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
      <ContactForm contact={user} mutate={mutateUser} />
    </div>
  )
}

const ProfileWithProtected = withProtected(Profile)

ProfileWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Profile'>{page}</Layout>
)

export default ProfileWithProtected
