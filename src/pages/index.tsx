import Header from '@/components/Header'
import Modal from '@/components/Home/modal'
import Summary from '@/components/Home/summary'
import NavBar from '@/components/NavBar'
import TopNav from '@/components/TopNav'

const dummyUsername = 'User'

const Home = () => {
  return (
    <>
      <Header pageTitle='Home' />
      <TopNav />
      <main className='absolute h-[calc(100%-7rem)] overflow-y-scroll bg-[url(/images/dog-home.png)] bg-contain bg-fixed bg-[left_50%_top_calc(100%-4rem)] bg-no-repeat'>
        <div className='h-[calc(max-content +4rem)] m-auto flex w-screen flex-col'>
          <div className='flex flex-col px-4 '>
            <h1 className='py-3 text-center text-3xl'>
              Welcome, {dummyUsername}!
            </h1>
            <Summary />
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

export default Home
