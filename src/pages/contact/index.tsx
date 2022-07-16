import { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import ContactList from '@/components/Contact/contactlist'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import SearchBar from '@/components/SearchBar/searchbar'
import SearchTag from '@/components/SearchBar/searchtag'
import { useFirestore } from '@/context/firestore'
import type { Contact } from '@/types/types'

// TODO: Get contact data from server
const tags = CONTACT_DATA.map((contact) => {
  return contact.tags
}).flat()
const set = new Set(tags)
const taglist = [...set]

const Contact = () => {
  const { userDoc } = useFirestore()
  const allContacts = userDoc.Contacts
  const [filteredContacts, setFilteredContacts] =
    useState<Contact[]>(allContacts)
  const [selectedOption, setSelectedOption] = useState('')
  const [searchFieldString, setSearchFieldString] = useState('')

  function filterContact(includes: string, searchField: string) {
    const filteredContacts = allContacts.filter((contact) => {
      const full_name = contact.displayName
      if (includes == '') {
        return full_name.toLocaleLowerCase().includes(searchField)
      }
      const filtered =
        full_name.toLocaleLowerCase().includes(searchField) &&
        contact.tags.some((v) => v.includes(includes))
      return filtered
    })
    setFilteredContacts(filteredContacts)
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchFieldString(searchFieldString)
    // TODO: Get contact data from server
    filterContact(selectedOption, searchFieldString)
  }

  const onSearchTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option_value = event.target.value
    setSelectedOption(option_value)
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
          <div className='m-2 flex flex-row rounded-xl border-2 border-grey'>
            <SearchTag options={taglist} onChangehandler={onSearchTagChange} />
            <div className='flex w-full justify-between'>
              <SearchBar onChangeHandler={onSearchChange} />
              <SearchIcon className='my-auto mx-2 h-6' />
            </div>
          </div>
          {/* {searchFieldString === '' && selectedOption === '' && (
            <ProfileItem profile={allContacts[0]} image='' />
          )} */}
          <ContactList contacts={filteredContacts} />
        </div>
      </main>
      <NavBar />
    </>
  )
}

// export default Contact
export default withProtected(Contact)
