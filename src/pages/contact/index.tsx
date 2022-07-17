import { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import PROFILE_DATA from '@/../mockData/PROFILE_DATA.json'
import ContactList from '@/components/Contact/contactlist'
import ProfileItem from '@/components/Contact/profileitem'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import SearchBar from '@/components/SearchBar/searchbar'
import SearchTag from '@/components/SearchBar/searchtag'
import type { Contact } from '@/types/types'
// import { withProtected } from '@/components/PrivateRoute

// TODO: Get contact data from server
const tags = CONTACT_DATA.map((contact) => {
  return contact.tags
}).flat()
const set = new Set(tags)
const tagfilter = [...set]
const typefilter = ['People', 'Pets']

const Contact = () => {
  const [filteredContacts, setFilteredContacts] =
    useState<Contact[]>(CONTACT_DATA)

  const [selectedTag, setSelectedTag] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [searchFieldString, setSearchFieldString] = useState('')

  function filterContact(tagf: string, typef: string, searchField: string) {
    const filteredContacts = CONTACT_DATA.filter((contact) => {
      const full_name = contact.firstName + ' ' + contact.lastName
      let pets = ''
      contact.pets.forEach((pet) => {
        pets += pet.name + ' '
      })
      if (tagf == '' && typef == '') {
        return full_name.toLocaleLowerCase().includes(searchField)
      }
      if (!contact.tags.some((v) => v.includes(tagf))) return false
      if (
        !full_name.toLocaleLowerCase().includes(searchField) &&
        typef.toLocaleLowerCase() === 'people'
      )
        return false
      if (
        !pets.toLocaleLowerCase().includes(searchField) &&
        typef.toLocaleLowerCase() === 'pets'
      )
        return false
      return true
    })
    setFilteredContacts(filteredContacts)
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchFieldString(searchFieldString)
    // TODO: Get contact data from server
    filterContact(selectedTag, selectedType, searchFieldString)
  }

  const onSearchTagChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    isTags: boolean
  ) => {
    const option_value = event.target.value
    if (isTags) {
      setSelectedTag(option_value)
      filterContact(option_value, selectedType, searchFieldString)
    } else {
      setSelectedType(option_value)
      filterContact(selectedTag, option_value, searchFieldString)
    }
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
              options={typefilter}
              onChangehandler={(e) => onSearchTagChange(e, false)}
            />
            <SearchTag
              options={tagfilter}
              onChangehandler={(e) => onSearchTagChange(e, true)}
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
