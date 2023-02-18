import { useState } from 'react'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import { AddButton } from '@/components/Visit/buttons'
import ReportList from '@/components/Visit/reportlist'
import SearchBar from '@/components/Visit/searchbar'
import { NextPageWithLayout } from '@/pages/_app'

const Visit: NextPageWithLayout = () => {
  
  const router = useRouter();
  const { visitId } = router.query;

  const [searchQuery, setSearchQuery] = useState('')
  return (
    <div className='main-style'>
      <div className='flex w-screen flex-col p-4'>
        <div className='align-center flex flex-row justify-around'>
          <SearchBar onChange={(event) => setSearchQuery(event.target.value)} />
          <AddButton />
        </div>
        <ReportList searchQuery={searchQuery} visitId={visitId}/>
      </div>
    </div>
  )
}

const VisitWithProtected = withProtected(Visit)

VisitWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Report'>{page}</Layout>
)

export default VisitWithProtected
