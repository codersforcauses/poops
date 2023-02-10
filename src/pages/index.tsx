import { ReactElement } from 'react'
import Link from 'next/link'

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

  const { data: tempUser } = useUser()

  const { addDummyContacts, addDummyVisits } = useDummyData()

  const welcomeMessage = currentUser
    ? `Welcome, ${tempUser?.info.name}!`
    : 'Welcome!'

  return (
    <div className='main-style'>
      <div className='h-full bg-[url(/images/dog-home.png)] bg-contain bg-fixed bg-[left_50%_top_calc(100%-4rem)] bg-no-repeat'>
        <div className='h-[calc(max-content +4rem)] m-auto flex w-screen flex-col'>
          <div className='flex flex-col px-4 '>
            <h1 className='py-3 text-center text-3xl'>{welcomeMessage}</h1>
            <Summary />
            <br />
            <div className='flex flex-col justify-center'>
              <Link href='visit/set'>
                <a className='flex justify-center'>
                  <Button size='large'>START VISIT</Button>
                </a>
              </Link>
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
