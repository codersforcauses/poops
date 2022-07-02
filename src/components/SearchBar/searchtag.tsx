type SearchTagProps = {
  options: string[]
  onChangehandler: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SearchTag = ({ options, onChangehandler }: SearchTagProps) => {
  return (
    <div>
      <select onChange={onChangehandler}>
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
