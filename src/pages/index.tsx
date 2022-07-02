import Header from '@/components/Header'
import Button from '@/components/Home/button'
import Summary from '@/components/Home/summary'

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Header pageTitle='Home' />

      <main>
        <div className='space-between w-100 h-100 flex flex-col'>
          <div className='flex h-screen flex-col px-4'>
            <h1 className='py-2 text-center'>Welcome, User!</h1>
            <Summary />
            <br />
            <Button />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
