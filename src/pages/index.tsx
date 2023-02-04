import { ReactElement } from 'react'
import Link from 'next/link'

import Summary from '@/components/Home/summary'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import { useAuth } from '@/context/Firebase/Auth/context'
import useUser from '@/hooks/user'
import mod from '@/lib/temp/firebase/functions/setRole'

import { NextPageWithLayout } from './_app'
import useDummyData from '@/hooks/dummyData'

const Home: NextPageWithLayout = () => {
  const { currentUser, refreshUserToken } = useAuth()

  const { data: tempUser } = useUser()

  const { addDummyContacts, addDummyVisits } = useDummyData()

  const welcomeMessage = currentUser
    ? `Welcome, ${tempUser?.info.name}!`
    : 'Welcome!'

  const onMod = (adminAccess: boolean) => {
    if (currentUser) {
      mod(adminAccess, currentUser, refreshUserToken)
    }
  }

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
              {process.env.NODE_ENV === 'development' && (
                <div className='mt-4 flex flex-col gap-2'>
                  <Button
                    size='small'
                    intent='secondary'
                    type='button'
                    onClick={() => onMod(true)}
                  >
                    Mod me!
                  </Button>
                  <Button
                    size='small'
                    intent='secondary'
                    onClick={addDummyContacts}
                  >
                    Add Contacts
                  </Button>
                  <Button
                    size='small'
                    intent='secondary'
                    onClick={addDummyVisits}
                  >
                    Add Visits
                  </Button>
                </div>
              )}
            </div>
            <br />
            <br />
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
