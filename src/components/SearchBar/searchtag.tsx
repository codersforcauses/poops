import { useSetAtom } from 'jotai'

import { searchTagsAtom } from '@/atoms/contacts'
import { useContacts } from '@/hooks/contacts'

const SearchTag = () => {
  const { data: contacts } = useContacts()
  const setSearchTags = useSetAtom(searchTagsAtom)

  if (contacts === undefined) return null

  const taglist = [
    ...new Set(
      contacts
        .map((contact) => {
          return contact.tags
        })
        .flat()
    )
  ]

  return (
    <div>
      <select
        onChange={(e) => {
          setSearchTags(e.target.value)
        }}
        className='h-10 border-r border-none bg-transparent pl-2 pr-8 text-sm valid:text-black invalid:text-[#9ca3af] focus:outline-none'
      >
        <option value='' disabled>
          Filter By
        </option>
        <option value=''>All</option>
        {taglist.map((t) => {
          return (
            <option key={t} value={t}>
              {t}
            </option>
          )
        })}
      </select>
    </div>
  )
}
export default SearchTag
