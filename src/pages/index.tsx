import Header from '@/components/Header'
import Modal from '@/components/Home/modal'
import Summary from '@/components/Home/summary'
import NavBar from '@/components/NavBar'
// import { withProtected } from '@/components/PrivateRoute'

const dummyUsername = 'User'

const Home = () => {
  return (
    <>
      <Header pageTitle='Home' />
      <main
        className='bg-contain bg-fixed bg-no-repeat '
        style={{
          backgroundImage: `url(/images/dog-home.jpeg)`,
          backgroundPosition: '50% calc(100% - 4rem)'
        }}
      >
        <div className='m-auto flex w-screen flex-col'>
          <div className='flex h-screen flex-col overflow-y-scroll px-4'>
            <h1 className='py-3 text-center text-3xl'>
              Welcome, {dummyUsername}!
            </h1>
            <Summary />
            <br />
            <div className='flex justify-center'>
              <Modal />
            </div>
            <br />
          </div>
        </div>
      </main>
      <div>
        <NavBar />
      </div>
    </>
  )
}

export default Home
// export default withProtected(Home)
