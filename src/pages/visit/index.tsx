import { useState } from 'react'
import { ReactElement } from 'react'

import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import { AddButton } from '@/components/Visit/buttons'
import SearchBar from '@/components/Visit/searchbar'
import VisitList from '@/components/Visit/visitlist'
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
        <VisitList searchQuery={searchQuery} />
      </div>
    </div>
  )
}

const VisitWithProtected = withProtected(Visit)

VisitWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Visit'>{page}</Layout>
)

export default VisitWithProtected