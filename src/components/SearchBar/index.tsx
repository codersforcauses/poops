import { ChangeEvent } from 'react'

type ContactBoxProps = {
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
}

function SearchBar({ onChangeHandler }: ContactBoxProps) {
  return (
    <input
      className='h-10 w-full rounded-lg border-none bg-transparent pl-2 text-sm focus:outline-none'
      type='search'
      name='search'
      placeholder='Search...'
      onChange={onChangeHandler}
    />
  )
}

export default SearchBar
