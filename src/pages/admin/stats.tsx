import Summary from '@/components/Admin/Stats/summary'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import TopNav from '@/components/TopNav'

const dummyUsername = 'Admin'

const Stats = () => {
  return (
    <>
      <Header pageTitle='Home' />
      <TopNav />
      <main className='absolute h-[calc(100%-7rem)] overflow-y-scroll bg-contain bg-fixed bg-[left_50%_top_calc(100%-4rem)] bg-no-repeat'>
        <div className='h-[calc(max-content +4rem)] m-auto flex w-screen flex-col'>
          <div className='flex flex-col px-4 '>
            <h1 className='py-3 text-center text-3xl'>
              Welcome, {dummyUsername}!
            </h1>
            <Summary />
          </div>
        </div>
      </main>
      <NavBar />
    </>
  )
}

export default Stats
