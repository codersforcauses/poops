import { useState } from 'react'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import ContactList from '@/components/Contact/contactlist'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar/searchbar'

type contactData = {
  id: string
  first_name: string
  last_name: string
  pets: string
  email: string
  phone: string
  street_address: string
  region: string
  notes: string
}

const Contact = () => {
  const [filteredContacts, setFilteredContacts] =
    useState<contactData[]>(CONTACT_DATA)

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    const filteredContacts = CONTACT_DATA.filter((contact) => {
      const full_name = contact.first_name + ' ' + contact.last_name
      return full_name.toLocaleLowerCase().includes(searchFieldString)
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
          <SearchBar onChangeHandler={onSearchChange} />
          <ContactList contacts={filteredContacts} />
        </div>
      </main>
    </>
  )
}

export default Contact
