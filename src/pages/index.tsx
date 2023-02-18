import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import Summary from '@/components/Home/summary'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import { useAuth } from '@/context/Firebase/Auth/context'
import useDummyData from '@/hooks/dummyData'
import useUser from '@/hooks/user'

import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  const { currentUser } = useAuth()
  const router = useRouter()
  const { data: tempUser } = useUser()

  const { addDummyContacts, addDummyVisits } = useDummyData()

  const welcomeMessage = currentUser
    ? `Welcome, ${tempUser?.info.name}!`
    : 'Welcome!'

  return (
    <div className='main-style'>
      <div className='h-full bg-[url(/images/dog-home.png)] bg-contain bg-fixed bg-[left_50%_top_calc(100%-4rem)] bg-no-repeat'>
        <div className='h-[calc(max-content +4rem)] m-auto flex w-screen flex-col'>
          <div className='mx-auto flex flex-col gap-4 py-4'>
            <h1 className='text-center text-3xl'>{welcomeMessage}</h1>
            <Summary />
            <div className='flex justify-center'>
              <Button size='large' onClick={() => router.push('/visit/set')}>
                START VISIT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HomeWithProtected = withProtected(Home)

HomeWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Home'>{page}</Layout>
)

export default HomeWithProtected
