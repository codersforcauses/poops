import { useMemo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import ContactDetails from '@/components/Contact/contactdetails'
import ContactItem from '@/components/Contact/contactitem'
import ContactList from '@/components/Contact/contactlist'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import SearchBar from '@/components/SearchBar'
import SearchTag from '@/components/SearchBar/searchtag'
import TopNav from '@/components/TopNav'
import Button from '@/components/UI/button'
import { useContact } from '@/context/ContactContext/context'
import { useFirestore } from '@/context/Firebase/Firestore/context'
import type { Contact } from '@/types/types'
import useUser from '@/hooks/user'

const Contact = () => {
  const { data: currentUser } = useUser()

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

  const contactIndex = getDisplayContactIndex()
  const creatingNewContact = getCreatingNewContact()

  if (currentUser === undefined) return null

  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Contact' />
      <TopNav />
      <main className='h-[calc(100%-7rem)]'>
        {contactIndex === null && !creatingNewContact && (
          <div className='m-auto flex h-14 max-w-md flex-row'>
            <div className='flex-1'></div>
            <h1 className='m-3 flex-1 text-center text-2xl'>Contacts</h1>
            <div className='m-auto flex-1 text-center'>
              <Button size='medium' onClick={() => setCreatingNewContact(true)}>
                Add
              </Button>
            </div>
          </div>
        )}
        <div className='m-auto max-w-md'>
          {contactIndex === null && !creatingNewContact && (
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
                <MagnifyingGlassIcon className='my-auto mx-2 h-6' />
              </div>
            </div>
          )}
          {contactIndex === null && !creatingNewContact ? (
            <>
              <ContactItem image='' firestoreIndex={-1} contact={currentUser} />
              <ContactList firestoreIndexMap={getFilteredIndexes()} />
            </>
          ) : (
            <ContactDetails firestoreIndex={contactIndex as number} />
          )}
        </div>
      </main>
      {contactIndex === null && <NavBar />}
    </>
  )
}

export default withProtected(Contact)
