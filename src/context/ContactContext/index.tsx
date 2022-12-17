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
import { useFirestore } from '@/context/Firebase/Firestore/context'
import { Contact } from '@/types/types'

const ContactProvider = ({ children }: { children: ReactNode }) => {
  const { userDoc, updateContact } = useFirestore()
  const [allContacts, setAllContacts] = useState(userDoc.contacts || [])
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
    setAllContacts(userDoc.contacts)
  }, [userDoc.contacts])

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
  const setFirestoreContacts = useCallback(
    (newContacts: Contact[]) => {
      userDoc.contacts = newContacts
      updateContact?.(userDoc)
    },
    [updateContact, userDoc]
  )

  const insertContact = useCallback(
    (contact: Contact, index?: number) => {
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
    [allContacts, filterContact, setFirestoreContacts]
  )

  const removeContact = useCallback(
    (index: number) => {
      const newArray = [...allContacts]
      newArray.splice(index)

      filterContact('', '', newArray) // reset filter with new contacts
      setAllContacts(newArray)
      setFirestoreContacts(newArray)
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
