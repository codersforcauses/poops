import { useState } from 'react'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import TopNav from '@/components/TopNav'
import { AddButton } from '@/components/Visit/buttons'
import SearchBar from '@/components/Visit/searchbar'
import VisitList from '@/components/Visit/visitlist'

const Visit = () => {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <>
      <Header pageTitle='Visit' />
      <TopNav />
      <main>
        <div className='flex w-screen flex-col p-4'>
          <div className='align-center flex flex-row justify-around'>
            <SearchBar
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <AddButton />
          </div>

          <VisitList searchQuery={searchQuery} />
        </div>
      </main>
      <NavBar />
    </>
  )
}

export default withProtected(Visit)
// export default Visit
