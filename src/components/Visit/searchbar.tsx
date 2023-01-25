import { ChangeEvent } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchBarProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <div className='flex flex-col content-center'>
      <div className='flex h-[40px] w-[300px] flex-row self-center rounded-xl border border-gray-500 bg-white p-1 drop-shadow-default'>
        <MagnifyingGlassIcon className='floating pointer-events-none m-1 h-6 w-6 text-gray-500' />
        <input
          className='bg m-0 w-full border-0 text-left outline-0'
          placeholder='Search...'
          onChange={props.onChange}
        />
      </div>
    </div>
  )
}

export default SearchBar
