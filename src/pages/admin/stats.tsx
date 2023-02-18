import { ReactElement } from 'react'
import Router from 'next/router'

import StatsBreakdown from '@/components/Admin/statsbreakdown'
import VolunteerStatsTable from '@/components/Admin/volunteerstatstable'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import { NextPageWithLayout } from '@/pages/_app'

const Stats: NextPageWithLayout = () => {
  return (
    <div className='main-style container m-4 mx-auto flex flex-col gap-4'>
      <div>
        <Button
          size='medium'
          intent='primary'
          type='button'
          className='m-3'
          onClick={() => Router.push('/admin')}
        >
          Back
        </Button>
      </div>
      <h1 className='mx-auto text-center text-4xl font-bold text-primary-dark'>
        Admin Summary Dashboard
      </h1>
      <StatsBreakdown />
      <div className='mb-20'>
        <VolunteerStatsTable />
      </div>
    </div>
  )
}

const StatsWithProtected = withProtected(Stats)

StatsWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Statistics'>{page}</Layout>
)

export default StatsWithProtected
