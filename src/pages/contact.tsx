import { ReactElement } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAtom, useAtomValue } from 'jotai'

import { currentContactAtom, isEditingAtom } from '@/atoms/contacts'
import ContactDetails from '@/components/Contact/contactdetails'
import ContactItem from '@/components/Contact/contactitem'
import ContactList from '@/components/Contact/contactlist'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import SearchBar from '@/components/SearchBar'
import SearchTag from '@/components/SearchBar/searchtag'
import Button from '@/components/UI/button'
import { useContacts } from '@/hooks/contacts'
import useUser from '@/hooks/user'
import type { Contact } from '@/types/types'

import { NextPageWithLayout } from './_app'

const Contact: NextPageWithLayout = () => {
  const { data: currentUser } = useUser()
  const { data: contacts } = useContacts()

  const currentContact = useAtomValue(currentContactAtom)

  const [isEditing, setIsEditing] = useAtom(isEditingAtom)
  if (currentUser === undefined || contacts === undefined) return null

  const noCurrentContact = currentContact === null
  const isListView = noCurrentContact && !isEditing

  return (
    <>
      {/* <Seo /> */}
      <div className='h-[calc(100%-7rem)]'>
        {isListView && (
          <div className='m-auto flex h-14 max-w-md flex-row'>
            <div className='flex-1'></div>
            <h1 className='m-3 flex-1 text-center text-2xl'>Contacts</h1>
            <div className='m-auto flex-1 text-center'>
              <Button size='medium' onClick={() => setIsEditing(true)}>
                Add
              </Button>
            </div>
          </div>
        )}
        <div className='m-auto max-w-md'>
          {isListView && (
            <div className='border-grey m-2 flex flex-row rounded-xl border-2'>
              <SearchTag />
              <div className='flex w-full justify-between'>
                <SearchBar />
                <MagnifyingGlassIcon className='my-auto mx-2 h-6' />
              </div>
            </div>
          )}
          {isListView ? (
            <>
              <ContactItem contact={currentUser.info} />
              <ContactList />
            </>
          ) : (
            <ContactDetails />
          )}
        </div>
      </div>
    </>
  )
}

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout title='Contact'>{page}</Layout>
}

// export default withProtected(Contact)
export default Contact
