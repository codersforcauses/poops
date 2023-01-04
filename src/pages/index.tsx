import Link from 'next/link'

import Header from '@/components/Header'
import Summary from '@/components/Home/summary'
import NavBar from '@/components/NavBar'
import TopNav from '@/components/TopNav'
import Button from '@/components/UI/button'
import { useAuth } from '@/context/Firebase/Auth/context'
import useUser from '@/hooks/user'
import mod from '@/lib/temp/firebase/functions/setRole'

const Home = () => {
  const { currentUser, getUserToken } = useAuth()
  const { isSuccess } = useUser()

  const welcomeMessage = isSuccess
    ? `Welcome, ${currentUser?.displayName}!`
    : 'Welcome!'

  const onMod = (adminAccess: boolean) => {
    if (currentUser) {
      mod(adminAccess, currentUser, getUserToken)
    }
  }

  return (
    <>
      <Header pageTitle='Home' />
      <TopNav />
      <main className='absolute h-[calc(100%-7rem)] overflow-y-scroll bg-[url(/images/dog-home.png)] bg-contain bg-fixed bg-[left_50%_top_calc(100%-4rem)] bg-no-repeat'>
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
              <br />
              <Button
                size='medium'
                intent='secondary'
                type='button'
                onClick={() => onMod(true)}
              >
                Mod me!
              </Button>
            </div>
            <br />
            <br />
          </div>
        </div>
      </main>
      <NavBar />
    </>
  )
}

export default Home
