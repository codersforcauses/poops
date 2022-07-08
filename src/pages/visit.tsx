import { useState } from 'react'

import SearchBar from '@/components/visit/searchBar'
import VisitList from '@/components/visit/visitList'

const Visit = () => {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <main>
      <div className='space-between flex w-screen flex-col p-4'>
        <SearchBar onChange={(event) => setSearchQuery(event.target.value)} />
        <VisitList searchQuery={searchQuery} />
      </div>
    </main>
  )
}

export default Visit
