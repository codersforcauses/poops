import { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'

import ContactDetails from '@/components/Contact/contactdetails'
import ContactList from '@/components/Contact/contactlist'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import SearchBar from '@/components/SearchBar/searchbar'
import SearchTag from '@/components/SearchBar/searchtag'
import { useFirestore } from '@/context/firestore'
import type { Contact } from '@/types/types'

const Contact = () => {
  const { userDoc, updateContact } = useFirestore()
  const allContacts = userDoc.Contacts

  // Get all unique tags to popular dropdown filter
  const tags = allContacts
    .map((contact) => {
      return contact.tags
    })
    .flat()
  const set = new Set(tags)
  const taglist = [...set]

  // List of firestoreIndexes to that populate visible contacts
  const [filteredIndexes, setFilteredIndexes] = useState<number[]>([
    ...allContacts.keys()
  ])

  const [selectedOption, setSelectedOption] = useState('')
  const [searchFieldString, setSearchFieldString] = useState('')
  const [displayContact, setDisplayContact] = useState<null | {
    firestoreIndex: number
    contact: Contact
  }>(null)

  function filterContact(includes: string, searchField: string) {
    const filteredIndexes: number[] = []
    allContacts.forEach((contact: Contact, index: number) => {
      if (includes == '') {
        if (contact.displayName.toLocaleLowerCase().includes(searchField)) {
          filteredIndexes.push(index)
        }
      } else {
        const filtered =
          contact.displayName.toLocaleLowerCase().includes(searchField) &&
          contact.tags.some((v) => v.includes(includes))

        if (filtered) {
          filteredIndexes.push(index)
        }
      }
    })
    setFilteredIndexes(filteredIndexes)
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchFieldString(searchFieldString)
    filterContact(selectedOption, searchFieldString)
  }

  const onSearchTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option_value = event.target.value
    setSelectedOption(option_value)
    filterContact(option_value, searchFieldString)
  }

  // Sends allContacts to Firestore
  const setFirestoreContacts = () => {
    userDoc.Contacts = allContacts
    if (updateContact !== undefined) updateContact(userDoc)
  }

  const modifyContact = (index: number, contact: Contact) => {
    allContacts[index] = contact
    setFirestoreContacts()
  }

  // TODO: Hook up following function to add button form
  // const addContact = (contact: Contact) => {
  //   allContacts.push(contact)
  //   setFirestoreContacts()
  // }

  // TODO: Hook up following function to delete button
  // const removeContact = (index: number) => {
  //   allContacts.splice(index)
  //   setFirestoreContacts()
  // }

  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Contact' />
      <main>
        {displayContact === null && (
          <div className='m-auto flex h-14 max-w-md flex-row'>
            <div className='flex-1'></div>
            <h1 className='m-3 flex-1 text-center text-2xl'>Contacts</h1>
            <div className='flex-1'></div>
          </div>
        )}
        <div className='m-auto max-w-md'>
          {displayContact === null && (
            <div className='m-2 flex flex-row rounded-xl border-2 border-grey'>
              <SearchTag
                options={taglist}
                onChangehandler={onSearchTagChange}
              />
              <div className='flex w-full justify-between'>
                <SearchBar onChangeHandler={onSearchChange} />
                <SearchIcon className='my-auto mx-2 h-6' />
              </div>
            </div>
          )}
          {displayContact === null ? (
            <ContactList
              allContacts={allContacts}
              firestoreIndexMap={filteredIndexes}
              setDisplayContact={setDisplayContact}
            />
          ) : (
            <ContactDetails
              contact={displayContact.contact}
              firestoreIndex={displayContact.firestoreIndex}
              modifyContact={modifyContact}
              setDisplayContact={setDisplayContact}
            />
          )}
        </div>
      </main>
      {!displayContact && <NavBar />}
    </>
  )
}

// export default Contact
export default withProtected(Contact)
