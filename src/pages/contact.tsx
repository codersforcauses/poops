import { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import PROFILE_DATA from '@/../mockData/PROFILE_DATA.json'
import ContactList from '@/components/Contact/contactlist'
import ProfileItem from '@/components/Contact/profileitem'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar/searchbar'
import SearchTag from '@/components/SearchBar/searchtag'
import type { Contact } from '@/types/types'

const tags = CONTACT_DATA.map((contact) => {
  return contact.tags
}).flat()
const set = new Set(tags)
const taglist = [...set]

const Contact = () => {
  const [filteredContacts, setFilteredContacts] =
    useState<Contact[]>(CONTACT_DATA)

  const [selectedOption, setSelectedOption] = useState('')
  const [searchFieldString, setSearchFieldString] = useState('')

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchFieldString(searchFieldString)
    const filteredContacts = CONTACT_DATA.filter((contact) => {
      const full_name = contact.first_name + ' ' + contact.last_name
      if (selectedOption == '') {
        return full_name.toLocaleLowerCase().includes(searchFieldString)
      }
      const filtered =
        full_name.toLocaleLowerCase().includes(searchFieldString) &&
        contact.tags.some((v) => v.includes(selectedOption))
      return filtered
    })
    setFilteredContacts(filteredContacts)
  }

  const onSearchTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option_value = event.target.value
    setSelectedOption(option_value)
    const filteredContacts = CONTACT_DATA.filter((contact) => {
      const full_name = contact.first_name + ' ' + contact.last_name
      if (option_value == '') {
        return full_name.toLocaleLowerCase().includes(searchFieldString)
      }

      const filteredwithTag =
        contact.tags.some((v) => v.includes(option_value)) &&
        full_name.toLocaleLowerCase().includes(searchFieldString)
      return filteredwithTag
    })
    setFilteredContacts(filteredContacts)
  }

  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Contact' />

      <main>
        <h1 className='m-3 text-center text-2xl'>Contacts</h1>
        <div className='m-auto max-w-md'>
          <div className='m-2 flex flex-row rounded-xl border-2 border-grey'>
            <SearchTag options={taglist} onChangehandler={onSearchTagChange} />
            <SearchBar onChangeHandler={onSearchChange} />
            <SearchIcon className='my-auto mx-3 h-6 rounded-full' />
          </div>
          <ProfileItem profile={PROFILE_DATA} image='' />
          <ContactList contacts={filteredContacts} />
        </div>
      </main>
    </>
  )
}

export default Contact
