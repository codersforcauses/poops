type SearchTagProps = {
  options: string[]
  onChangehandler: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SearchTag = ({ options, onChangehandler }: SearchTagProps) => {
  return (
    <div>
      <select
        onChange={onChangehandler}
        className='SearchTag h-10 w-full rounded-lg border-2 bg-white px-5 pr-16 text-sm focus:outline-none'
      >
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
