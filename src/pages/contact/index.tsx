import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import ContactItem from '@/components/Contact/contactitem'
import ContactList from '@/components/Contact/contactlist'
import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import SearchBar from '@/components/SearchBar'
import SearchTag from '@/components/SearchBar/searchtag'
import Button from '@/components/UI/button'
import useUser from '@/hooks/user'
import { NextPageWithLayout } from '@/pages/_app'
import type { Contact } from '@/types/types'

const Contact: NextPageWithLayout = () => {
  const router = useRouter()
  const { data: currentUser } = useUser()

  if (currentUser === undefined) return null

  return (
    <div className='main-style p-4'>
      {/* <Seo /> */}
      <div className='h-full'>
        <div className='m-auto flex h-14 max-w-md flex-row'>
          <div className='flex-1'></div>
          <h1 className='m-3 flex-1 text-center text-2xl'>Contacts</h1>
          <div className='m-auto flex-1 text-center'>
            <Button
              size='medium'
              onClick={() => {
                router.push('/contact/new')
              }}
            >
              Add
            </Button>
          </div>
        </div>
        <div className='m-auto max-w-md'>
          <div className='border-grey m-2 flex flex-row rounded-xl border-2'>
            <SearchTag />
            <div className='flex w-full justify-between'>
              <SearchBar />
              <MagnifyingGlassIcon className='my-auto mx-2 h-6' />
            </div>
          </div>
          <ContactItem contact={currentUser.info} />
          <ContactList />
        </div>
      </div>
    </div>
  )
}

const ContactWithProtected = withProtected(Contact)

ContactWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Contact'>{page}</Layout>
)

export default ContactWithProtected
