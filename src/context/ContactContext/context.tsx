import {
  ChangeEvent,
  createContext,
  Dispatch,
  SetStateAction,
  useContext
} from 'react'

import { Contact } from '@/types/types'

export type ContactContextProps = {
  allContacts: Contact[]
  insertContact: (contact: Contact, index?: number) => number
  removeContact: (index: number) => void
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSearchTagChange: (event: ChangeEvent<HTMLSelectElement>) => void
  setDisplayContactIndex: Dispatch<SetStateAction<number>>
  getDisplayContactIndex: () => number
  setCreatingNewContact: (newValue: boolean) => void
  getCreatingNewContact: () => boolean
  getFilteredIndexes: () => number[]
}

const ContactContext = createContext<ContactContextProps>({
  allContacts: Array<Contact>(),
  insertContact: () => -2,
  removeContact: () => undefined,
  onSearchChange: () => undefined,
  onSearchTagChange: () => undefined,
  setDisplayContactIndex: () => undefined,
  getDisplayContactIndex: () => -2,
  setCreatingNewContact: () => undefined,
  getCreatingNewContact: () => false,
  getFilteredIndexes: () => Array<number>()
})

export const ContactContextProvider = ContactContext.Provider

export const useContact = () => useContext(ContactContext)
