import Header from '@/components/Header'
import Modal from '@/components/Home/modal'
import Summary from '@/components/Home/summary'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import TopNav from '@/components/TopNav'
import { useFirestore } from '@/context/Firebase/Firestore/context'

const Home = () => {
  const { userDoc } = useFirestore()
  const dummyUsername = userDoc.displayName ? ', ' + userDoc.displayName : ''
  const allVisits = userDoc.visits
  const numVisits = allVisits.length.toString()
  let distanceWalked = 0
  for (const visit of allVisits) {
    distanceWalked += visit.walkDist
  }
  const distWalked = distanceWalked.toString()
  return (
    <>
      <Header pageTitle='Home' />
      <TopNav />
      <main className='absolute h-[calc(100%-7rem)] overflow-y-scroll bg-[url(/images/dog-home.png)] bg-contain bg-fixed bg-[left_50%_top_calc(100%-4rem)] bg-no-repeat'>
        <div className='h-[calc(max-content +4rem)] m-auto flex w-screen flex-col'>
          <div className='flex flex-col px-4 '>
            <h1 className='py-3 text-center text-3xl'>
              Welcome{dummyUsername}!
            </h1>
            <Summary numVisits={numVisits} distWalked={distWalked} />
            <br />
            <div className='flex justify-center overscroll-none'>
              <Modal />
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

export default withProtected(Home)
//export default Home
