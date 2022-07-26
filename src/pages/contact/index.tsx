import {
  ChangeEvent,
  createContext,
  Dispatch,
  SetStateAction,
  useState
} from 'react'
import Link from 'next/link'
import { SearchIcon } from '@heroicons/react/outline'

import ContactDetails from '@/components/Contact/contactdetails'
import ContactList from '@/components/Contact/contactlist'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import SearchBar from '@/components/SearchBar'
import SearchTag from '@/components/SearchBar/searchtag'
import type { Contact } from '@/types/types'
import { useFirestore } from '@/context/Firebase/Firestore/context'

type ContactContextProps = {
  allContacts: Contact[]
  insertContact: (contact: Contact, index?: number) => number
  removeContact: (index: number) => void
  setDisplayContactIndex: Dispatch<SetStateAction<number>>
  getDisplayContactIndex: () => number
  setCreatingNewContact: (newValue: boolean) => void
}

export const ContactContext = createContext<ContactContextProps>({
  allContacts: Array<Contact>(),
  insertContact: () => -2,
  removeContact: () => undefined,
  setDisplayContactIndex: () => undefined,
  getDisplayContactIndex: () => -2,
  setCreatingNewContact: () => undefined
})

export const ContactContextProvider = ContactContext.Provider

const Contact = () => {
  const { userDoc, updateContact } = useFirestore()
  const [allContacts, setAllContacts] = useState(userDoc.contacts)
  const [creatingNewContact, setCreatingNewContact] = useState(false)
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
  const [displayContactIndex, setDisplayContactIndex] = useState<number>(-1)

  function filterContact(
    tagf: string,
    searchField: string,
    contacts: Contact[]
  ) {
    const newFilteredIndexes: number[] = []
    contacts.forEach((contact: Contact, index: number) => {
      const reg = new RegExp(`(^|\\s|,)${searchField}`, 'gi')

      // don't show contacts without selected tag if tag selected
      if (tagf !== '' && !contact.tags.some((v) => v.includes(tagf))) {
        return false
      }

      if (reg.test(contact.displayName) || reg.test(contact.pets)) {
        newFilteredIndexes.push(index)
      }
    })
    setFilteredIndexes(newFilteredIndexes)
  }

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchFieldString(searchFieldString)
    filterContact(selectedOption, searchFieldString, allContacts)
  }

  const onSearchTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const option_value = event.target.value
    setSelectedOption(option_value)
    filterContact(option_value, searchFieldString, allContacts)
  }

  // Sends newContacts to Firestore
  const setFirestoreContacts = (newContacts: Contact[]) => {
    userDoc.contacts = newContacts
    updateContact?.(userDoc)
  }

  const contextValues = {
    allContacts: allContacts,

    insertContact: (contact: Contact, index?: number) => {
      let newArray: Contact[]
      if (index !== undefined) {
        newArray = [...allContacts]
        newArray[index] = contact
      } else {
        newArray = [...allContacts, contact]
      }
      filterContact('', '', newArray) // reset filter with new contacts
      setFirestoreContacts(newArray)
      setAllContacts(newArray)
      return index ? index : allContacts.length
    },

    removeContact: (index: number) => {
      if (index === 0) return // can't delete users own profile

      const newArray = [...allContacts]
      newArray.splice(index)

      filterContact('', '', newArray) // reset filter with new contacts
      setAllContacts(newArray)
      setFirestoreContacts(newArray)
    },

    setDisplayContactIndex: setDisplayContactIndex,
    getDisplayContactIndex: () => displayContactIndex,
    setCreatingNewContact: setCreatingNewContact
  }

  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Contact' />
      <ContactContext.Provider value={contextValues}>
        <main>
          {displayContactIndex === -1 && !creatingNewContact && (
            <div className='m-auto flex h-14 max-w-md flex-row'>
              <div className='flex-1'></div>
              <h1 className='m-3 flex-1 text-center text-2xl'>Contacts</h1>
              <div className='m-auto flex-1 text-center'>
                <button
                  onClick={() => setCreatingNewContact(true)}
                  type='button'
                  className='rounded bg-primary py-1 px-4 font-bold text-white hover:bg-dark-red'
                >
                  Add
                </button>
              </div>
            </div>
          )}
          <div className='m-auto max-w-md'>
            {displayContactIndex === -1 && !creatingNewContact && (
              <div className='border-grey m-2 flex flex-row rounded-xl border-2'>
                <SearchTag
                  name='Filter By'
                  options={taglist}
                  onChangehandler={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    onSearchTagChange(e)
                  }
                />
                <div className='flex w-full justify-between'>
                  <SearchBar onChangeHandler={onSearchChange} />
                  <SearchIcon className='my-auto mx-2 h-6' />
                </div>
              </div>
            )}
            {displayContactIndex === -1 && !creatingNewContact ? (
              <ContactList firestoreIndexMap={filteredIndexes} />
            ) : (
              <ContactDetails firestoreIndex={displayContactIndex} />
            )}
          </div>
        </main>
      </ContactContext.Provider>
      {displayContactIndex === -1 && <NavBar />}
    </>
  )
}

export default withProtected(Contact)
