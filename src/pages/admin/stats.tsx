import VoluteerStatsTable from '@/components/Admin/volunteerstatstable'
import Header from '@/components/Header'
import TopNav from '@/components/TopNav'

const Stats = () => {
  return (
    <>
      <Header pageTitle='Admin' />
      <TopNav />
      <main>
        <h1 className='my-8 mx-auto text-center text-4xl font-bold text-primary-dark'>
          Admin Summary Dashboard
        </h1>
        <VoluteerStatsTable />
      </main>
    </>
  )
}

export default Stats
