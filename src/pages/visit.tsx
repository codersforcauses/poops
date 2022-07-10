import { useState } from 'react'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import SearchBar from '@/components/Visit/searchbar'
import VisitList from '@/components/Visit/visitlist'

const Visit = () => {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <>
      <main>
        <div className='space-between flex w-screen flex-col p-4'>
          <SearchBar onChange={(event) => setSearchQuery(event.target.value)} />
          <VisitList searchQuery={searchQuery} />
        </div>
      </main>
      {/* <Header /> */}
      <Header pageTitle='Visit' />
      <NavBar />
    </>
  )
}

export default withProtected(Visit)
