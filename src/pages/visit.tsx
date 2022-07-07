import { useState } from 'react'

import VisitsSearchBar from '@/components/visit/searchBar'
import VisitList from '@/components/visit/visitList'

const Visit = () => {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <main>
      <div className='space-between flex h-screen w-screen flex-col p-4'>
        <VisitsSearchBar />
        <VisitList
          searchQuery={searchQuery}
          setSearchQuery={(event) => setSearchQuery(event.target.value)}
        />
      </div>
    </main>
  )
}

export default Visit
