import { ReactElement } from 'react'

import ContactDetails from '@/components/Contact/contactdetails'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import Spinner from '@/components/UI/loadingSpinner'
import useUser, { useMutateUser } from '@/hooks/user'
import { NextPageWithLayout } from '@/pages/_app'

const Profile: NextPageWithLayout = () => {
  const { data, isLoading } = useUser()
  const { mutate: mutateUser } = useMutateUser()

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
      <ContactDetails contact={user} mutate={mutateUser} />
    </div>
  )
}

const ProfileWithProtected = withProtected(Profile)

ProfileWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Profile'>{page}</Layout>
)

export default ProfileWithProtected
