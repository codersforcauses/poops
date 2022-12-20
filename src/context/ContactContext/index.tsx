import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import {
  ContactContextProps,
  ContactContextProvider
} from '@/context/ContactContext/context'
import { Contact } from '@/types/types'
import { useContacts, useCreateContact } from '@/hooks/contacts'

const ContactProvider = ({ children }: { children: ReactNode }) => {
  const { data: contacts } = useContacts()
  const { mutate: insertContact } = useCreateContact()
  const [allContacts, setAllContacts] = useState(contacts || [])
  const [creatingNewContact, setCreatingNewContact] = useState(false)
  const [displayContactIndex, setDisplayContactIndex] = useState<number | null>(
    null
  )
  // List of firestoreIndexes to that populate visible contacts
  const [filteredIndexes, setFilteredIndexes] = useState<number[]>([
    ...allContacts.keys()
  ])
  const [selectedOption, setSelectedOption] = useState('')
  const [searchFieldString, setSearchFieldString] = useState('')

  useEffect(() => {
    setAllContacts(contacts ?? [])
  }, [contacts])

  useEffect(() => {
    setFilteredIndexes([...allContacts.keys()])
  }, [allContacts])

  const filterContact = useCallback(
    (tagf: string, searchField: string, contacts: Contact[]) => {
      const newFilteredIndexes: number[] = []
      contacts.forEach((contact: Contact, index: number) => {
        const reg = new RegExp(`(^|\\s|,)${searchField}`, 'gi')

        // don't show contacts without selected tag if tag selected
        if (tagf !== '' && !contact.tags.some((v) => v.includes(tagf))) {
          return false
        }

        if (reg.test(contact.clientName) || reg.test(contact.pets)) {
          newFilteredIndexes.push(index)
        }
      })
      setFilteredIndexes(newFilteredIndexes)
    },
    []
  )

  // Sends newContacts to Firestore
  const setFirestoreContacts = (newContacts: Contact[]) => {console.log(newContacts)}
  // useCallback(
  // (newContacts: Contact[]) => {
  //   contacts = newContacts
  //   updateContact?.(userDoc)
  // },
  // [updateContact, userDoc]
  // )

  const removeContact = useCallback(
    (index: number) => {
      const newArray = [...allContacts]
      newArray.splice(index)

      filterContact('', '', newArray) // reset filter with new contacts
      setAllContacts(newArray)
      // setFirestoreContacts(newArray)
    },
    [allContacts, filterContact, setFirestoreContacts]
  )

  const onSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const searchFieldString = event.target.value.toLocaleLowerCase()
      setSearchFieldString(searchFieldString)
      filterContact(selectedOption, searchFieldString, allContacts)
    },
    [allContacts, filterContact, selectedOption]
  )

  const onSearchTagChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const option_value = event.target.value
      setSelectedOption(option_value)
      filterContact(option_value, searchFieldString, allContacts)
    },
    [allContacts, filterContact, searchFieldString]
  )

  const value: ContactContextProps = useMemo(
    () => ({
      allContacts: allContacts,
      insertContact: insertContact,
      removeContact: removeContact,
      onSearchChange: onSearchChange,
      onSearchTagChange: onSearchTagChange,
      setDisplayContactIndex: setDisplayContactIndex,
      getDisplayContactIndex: () => displayContactIndex,
      setCreatingNewContact: setCreatingNewContact,
      getCreatingNewContact: () => creatingNewContact,
      getFilteredIndexes: () => filteredIndexes
    }),
    [
      allContacts,
      creatingNewContact,
      displayContactIndex,
      filteredIndexes,
      insertContact,
      onSearchChange,
      onSearchTagChange,
      removeContact
    ]
  )

  return (
    <ContactContextProvider value={value}>{children}</ContactContextProvider>
  )
}

export default ContactProvider
