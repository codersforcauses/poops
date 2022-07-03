import { useState } from 'react'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import ContactList from '@/components/Contact/contactlist'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar/searchbar'
import SearchTag from '@/components/SearchBar/searchtag'
import type { Contact } from '@/types/types'

const Contact = () => {
  const tags = [
    'Armadale',
    'Busselton',
    'Coastal South',
    'Eastern',
    'Preston',
    'Southern',
    'Western',
    'Central',
    'Northern'
  ]

  const [filteredContacts, setFilteredContacts] =
    useState<Contact[]>(CONTACT_DATA)

  const [selectedOption, setSelectedOption] = useState('')

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    const filteredContacts = CONTACT_DATA.filter((contact) => {
      const full_name = contact.first_name + ' ' + contact.last_name
      const filtered =
        full_name.toLocaleLowerCase().includes(searchFieldString) &&
        contact.region.includes(selectedOption)
      return filtered
    })
    setFilteredContacts(filteredContacts)
  }

  const onSearchTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option_value = event.target.value
    setSelectedOption(option_value)
    const filteredContacts = CONTACT_DATA.filter((contact) => {
      return contact.region.includes(option_value)
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
          <SearchTag options={tags} onChangehandler={onSearchTagChange} />
          <SearchBar onChangeHandler={onSearchChange} />
          <ContactList contacts={filteredContacts} />
        </div>
      </main>
    </>
  )
}

export default Contact
