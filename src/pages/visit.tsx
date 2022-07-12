import { useState } from 'react'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import SearchBar from '@/components/Visit/searchbar'
import VisitList from '@/components/Visit/visitlist'
// import { withProtected } from '@/components/PrivateRoute'

const Visit = () => {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <>
      <Header pageTitle='Visit' />
      <main>
        <div className='space-between flex w-screen flex-col p-4'>
          <SearchBar onChange={(event) => setSearchQuery(event.target.value)} />
          <VisitList searchQuery={searchQuery} />
        </div>
      </main>
      <NavBar />
    </>
  )
}

// export default withProtected(Visit)
export default Visit
