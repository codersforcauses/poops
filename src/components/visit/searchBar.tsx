import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'

import { AddButton } from '@/components/visit/Buttons'

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <div className='flex flex-col content-center'>
      <div className='flex h-[40px] w-[300px] flex-row self-center rounded-xl border border-dark-gray bg-white p-1 drop-shadow-default'>
        <SearchIcon className='floating pointer-events-none m-1 h-6 w-6 text-dark-gray'></SearchIcon>
        <input
          className='bg m-0 w-full border-0 text-left outline-0'
          placeholder='Search...'
          onChange={props.onChange}
        />
      </div>

      <div className='flex justify-between p-4'>
        <button>
          <div className='h-[36px] w-[115px] rounded-md bg-primary p-0.5 text-center text-xs font-semibold text-white drop-shadow-default'>
            <p>REGISTER</p>
            <p>VET CONCERN</p>
          </div>
        </button>
        <button>
          <div className='h-[23.48px] w-[78px] rounded-md bg-primary p-0.5 text-center text-xs font-semibold text-white drop-shadow-default'>
            <p>REPORT</p>
          </div>
        </button>
        <AddButton />
      </div>
    </div>
  )
}

export default SearchBar
