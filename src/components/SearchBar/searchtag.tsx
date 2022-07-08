type SearchTagProps = {
  options: string[]
  onChangehandler: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SearchTag = ({ options, onChangehandler }: SearchTagProps) => {
  return (
    <div>
      <select
        onChange={onChangehandler}
        className='flex h-10 w-full flex-row border-none bg-transparent px-5 pr-16 text-sm focus:outline-none'
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
