import { useState } from 'react'

import CONTACT_DATA from '@/../mockData/CONTACT_DATA.json'
import ContactList from '@/components/Contact/contactlist'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar/SearchBar'

const Contact = () => {
  const [searchField, setSearchField] = useState('')

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchField(searchFieldString)
  }

  const filteredContacts = CONTACT_DATA.filter((contact) => {
    const full_name = contact.first_name + ' ' + contact.last_name
    return full_name.toLocaleLowerCase().includes(searchField)
  })
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
