import { useState } from 'react'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import TopNav from '@/components/TopNav'
import Button from '@/components/UI/button'
import { AddButton } from '@/components/Visit/buttons'
import IncidentForm from '@/components/Visit/incidentform'
import SearchBar from '@/components/Visit/searchbar'
import VisitForm from '@/components/Visit/visitform'
import VisitList from '@/components/Visit/visitlist'
import { useVisit } from '@/context/VisitContext/context'

const Visit = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { getCurrentForm } = useVisit()

  return (
    <>
      <Header pageTitle='Visit' />
      <TopNav />
      <main className='h-[calc(100%-7rem)]'>
        {getCurrentForm() !== null ? (
          getCurrentForm()
        ) : (
          <div className='flex h-full w-screen flex-col p-4'>
            <div className='align-center flex flex-row justify-around'>
              <SearchBar
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <AddButton />
            </div>

            <VisitList searchQuery={searchQuery} />
          </div>
        )}
      </main>
      <NavBar />
    </>
  )
}

export default withProtected(Visit)
