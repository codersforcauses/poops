import { ReactElement } from 'react'
import Router from 'next/router'

import StatsBreakdown from '@/components/Admin/statsbreakdown'
import VolunteerStatsTable from '@/components/Admin/volunteerstatstable'
import Layout from '@/components/Layout'
import { withAdmin } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import { NextPageWithLayout } from '@/pages/_app'

const Stats: NextPageWithLayout = () => {
  return (
    <div className='main-style container m-4 mx-auto flex flex-col gap-4'>
      <div className='flex-1'>
        <Button
          size='medium'
          type='button'
          onClick={() => Router.push('/admin')}
        >
          Back
        </Button>
        <h1 className='m-3 flex-1 text-center text-3xl font-bold text-primary-dark'>
          Admin Summary Dashboard
        </h1>
      </div>
      <StatsBreakdown />
      <div className='mb-20'>
        <VolunteerStatsTable />
      </div>
    </div>
  )
}

const StatsWithProtected = withAdmin(Stats)

StatsWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Statistics'>{page}</Layout>
)

export default StatsWithProtected
