import Link from 'next/link'

import Header from '@/components/Header'
import Summary from '@/components/Home/summary'
import NavBar from '@/components/NavBar'
import TopNav from '@/components/TopNav'
import Button from '@/components/UI/button'
import useUser from '@/hooks/user'

const Home = () => {
  const { isSuccess, data: currentUser } = useUser()

  const welcomeMessage = isSuccess
    ? `Welcome, ${currentUser?.info.name}!`
    : 'Welcome!'

  // getting user stats
  const numVisits = currentUser?.stats ? currentUser?.stats.numVisits : 0
  const numHours = currentUser?.stats ? currentUser?.stats.numHours : 0
  const commutedDist = currentUser?.stats ? currentUser?.stats.commutedDist : 0
  const walkedDist = currentUser?.stats ? currentUser?.stats.numVisits : 0

  return (
    <>
      <Header pageTitle='Home' />
      <TopNav />
      <main className='absolute h-[calc(100%-7rem)] overflow-y-scroll bg-[url(/images/dog-home.png)] bg-contain bg-fixed bg-[left_50%_top_calc(100%-4rem)] bg-no-repeat'>
        <div className='h-[calc(max-content +4rem)] m-auto flex w-screen flex-col'>
          <div className='flex flex-col px-4 '>
            <h1 className='py-3 text-center text-3xl'>{welcomeMessage}</h1>
            <Summary
              numVisits={numVisits}
              numHours={numHours}
              commutedDist={commutedDist}
              walkedDist={walkedDist}
            />
            <br />
            <div className='flex justify-center'>
              <Link href='visit/set'>
                <Button size='large'>START VISIT</Button>
              </Link>
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
