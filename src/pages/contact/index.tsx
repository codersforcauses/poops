import { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import PROFILE_DATA from '@/../mockData/PROFILE_DATA.json'
import ContactList from '@/components/Contact/contactlist'
import ProfileItem from '@/components/Contact/profileitem'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import SearchBar from '@/components/SearchBar'
import SearchTag from '@/components/SearchBar/SearchTag'
import type { Contact } from '@/types/types'

// TODO: Get contact data from server
const tags = CONTACT_DATA.map((contact) => {
  return contact.tags
}).flat()
const set = new Set(tags)
const tagFilter = [...set]

const Contact = () => {
  const [filteredContacts, setFilteredContacts] =
    // eslint-disable-next-line unused-imports/no-unused-vars
    useState<Contact[]>(CONTACT_DATA)

  const [selectedTag, setSelectedTag] = useState<string>('')
  const [searchFieldString, setSearchFieldString] = useState<string>('')

  function filterContact(tagf: string, searchField: string) {
    const filteredContacts = CONTACT_DATA.filter((contact) => {
      const full_name = contact.firstName + ' ' + contact.lastName

      // start for string, comma, or whitspace = word start, ignores case
      const reg = new RegExp(`(^|\\s|,)${searchField}`, 'gi')

      // don't show contacts without selected tag if tag selected
      if (tagf !== '' && !contact.tags.some((v) => v.includes(tagf)))
        return false

      return reg.test(full_name) || reg.test(contact.pets)
    })
    setFilteredContacts(filteredContacts)
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchFieldString(searchFieldString)
    // TODO: Get contact data from server
    filterContact(selectedTag, searchFieldString)
  }

  const onSearchTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option_value = event.target.value
    setSelectedTag(option_value)
    filterContact(option_value, searchFieldString)
  }

  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Contact' />

      <main>
        <div className='m-auto flex h-14 max-w-md flex-row'>
          <div className='flex-1'></div>
          <h1 className='m-3 flex-1 text-center text-2xl'>Contacts</h1>
          <div className='flex-1'></div>
        </div>

        <div className='m-auto max-w-md'>
          <div className='m-2 flex flex-row rounded-xl border-2 border-gray-300'>
            <SearchTag
              name='Filter By'
              options={tagFilter}
              onChangehandler={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onSearchTagChange(e)
              }
            />
            <div className='flex w-full justify-between'>
              <SearchBar onChangeHandler={onSearchChange} />
              <SearchIcon className='my-auto mx-2 h-6' />
            </div>
          </div>
          {searchFieldString === '' && selectedTag === '' && (
            <ProfileItem profile={PROFILE_DATA} image='' />
          )}
          <ContactList contacts={filteredContacts} />
        </div>
      </main>
      <NavBar />
    </>
  )
}

export default Contact
// export default withProtected(Contact)
