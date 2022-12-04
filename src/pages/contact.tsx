import { useMemo } from 'react'
import { SearchIcon } from '@heroicons/react/outline'

import ContactDetails from '@/components/Contact/contactdetails'
import ContactList from '@/components/Contact/contactlist'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import SearchBar from '@/components/SearchBar'
import SearchTag from '@/components/SearchBar/searchtag'
import TopNav from '@/components/TopNav'
import Button from '@/components/UI/button'
import { useContact } from '@/context/ContactContext/context'
import type { Contact } from '@/types/types'

const Contact = () => {
  const {
    allContacts,
    setCreatingNewContact,
    onSearchChange,
    onSearchTagChange,
    getDisplayContactIndex,
    getCreatingNewContact,
    getFilteredIndexes
  } = useContact()

  // Get all unique tags to popular dropdown filter
  const taglist = useMemo(() => {
    const tags = allContacts
      .map((contact) => {
        return contact.tags
      })
      .flat()
    const set = new Set(tags)
    return [...set]
  }, [allContacts])

  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Contact' />
      <TopNav />
      <main className='h-[calc(100%-7rem)]'>
        <div className='flex h-full flex-col p-4'>
          {/* <div className='mx-auto '> */}
          {getDisplayContactIndex() === -1 && !getCreatingNewContact() && (
            <div className='m-auto flex h-14 w-full flex-row'>
              <div className='flex-1'></div>
              <h1 className='m-3 flex-1 text-center text-2xl'>Contacts</h1>
              <div className='m-auto flex-1 text-center'>
                <Button onClick={() => setCreatingNewContact(true)}>Add</Button>
              </div>
            </div>
          )}
          {getDisplayContactIndex() === -1 && !getCreatingNewContact() && (
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

          {getDisplayContactIndex() === -1 && !getCreatingNewContact() ? (
            <ContactList firestoreIndexMap={getFilteredIndexes()} />
          ) : (
            <ContactDetails firestoreIndex={getDisplayContactIndex()} />
          )}
          {/* </div> */}
        </div>
      </main>
      {getDisplayContactIndex() === -1 && <NavBar />}
    </>
  )
}

export default withProtected(Contact)
