import { useSetAtom } from 'jotai'

import { searchQueryAtom } from '@/atoms/contacts'

function SearchBar() {
  const setSearchQuery = useSetAtom(searchQueryAtom)
  return (
    <input
      className='h-10 w-full rounded-lg border-none bg-transparent pl-2 text-sm focus:outline-none'
      type='search'
      name='search'
      placeholder='Search...'
      onChange={(e) => {
        setSearchQuery(e.target.value)
      }}
    />
  )
}

export default SearchBar
