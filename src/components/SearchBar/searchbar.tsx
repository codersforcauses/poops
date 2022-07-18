type ContactBoxProps = {
  placeholder: string
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function SearchBar({ placeholder, onChangeHandler }: ContactBoxProps) {
  return (
    <input
      className='h-10 w-full rounded-lg border-none bg-transparent text-sm focus:outline-none'
      type='search'
      name='search'
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  )
}

export default SearchBar
