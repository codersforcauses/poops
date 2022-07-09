type ContactBoxProps = {
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function SearchBar({ onChangeHandler }: ContactBoxProps) {
  return (
    <div>
      <input
        className='h-10 w-full rounded-lg border-none bg-transparent text-sm focus:outline-none'
        type='search'
        name='search'
        placeholder='Search'
        onChange={onChangeHandler}
      />
    </div>
  )
}

export default SearchBar
