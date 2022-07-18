type SearchTagProps = {
  name: string
  options: string[]
  onChangehandler: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SearchTag = ({ name, options, onChangehandler }: SearchTagProps) => {
  return (
    <div>
      <select
        onChange={onChangehandler}
        className='h-10 border-r border-none bg-transparent pl-2 pr-8 text-sm valid:text-black invalid:text-[#9ca3af] focus:outline-none'
      >
        <option value='' disabled>
          {name}
        </option>
        <option value=''>All</option>
        {options.map((o) => {
          return (
            <option key={o} value={o}>
              {o}
            </option>
          )
        })}
      </select>
    </div>
  )
}
export default SearchTag
