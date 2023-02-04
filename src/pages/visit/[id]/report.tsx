import { useState } from 'react'
import { ReactElement } from 'react'

import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import { AddButton } from '@/components/Visit/buttons'
import SearchBar from '@/components/Visit/searchbar'
import ReportList from '@/components/Visit/reportlist'
import { NextPageWithLayout } from '@/pages/_app'

const Visit: NextPageWithLayout = () => {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <div className='main-style'>
      <div className='flex w-screen flex-col p-4'>
        <div className='align-center flex flex-row justify-around'>
          <SearchBar onChange={(event) => setSearchQuery(event.target.value)} />
          <AddButton />
        </div>
        <ReportList searchQuery={searchQuery} />
      </div>
    </div>
  )
}

const VisitWithProtected = withProtected(Visit)

VisitWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Report'>{page}</Layout>
)

export default VisitWithProtected
