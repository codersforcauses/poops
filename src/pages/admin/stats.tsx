import { ReactElement } from 'react'

import StatsBreakdown from '@/components/Admin/statsbreakdown'
import VolunteerStatsTable from '@/components/Admin/volunteerstatstable'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import { NextPageWithLayout } from '@/pages/_app'

const Stats: NextPageWithLayout = () => {
  return (
    <>
      <div className='main-style'>
        <h1 className='my-8 mx-auto text-center text-4xl font-bold text-primary-dark'>
          Admin Summary Dashboard
        </h1>
        <StatsBreakdown />
        <VolunteerStatsTable />
      </div>
    </>
  )
}

const StatsWithProtected = withProtected(Stats)

StatsWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Statistics'>{page}</Layout>
)

export default StatsWithProtected
