import { useEffect, useState } from 'react'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import TopNav from '@/components/TopNav'
import { AddButton } from '@/components/Visit/buttons'
import SearchBar from '@/components/Visit/searchbar'
import VisitForm from '@/components/Visit/visitform'
import VisitList from '@/components/Visit/visitlist'

const Visit = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentForm, setCurrentForm] = useState<null | JSX.Element>(null)
  const [isFormActive, setIsFormActive] = useState(false)

  const toggleVisitForm = () => {
    if (isFormActive) {
      setCurrentForm(null)
    } else {
      setCurrentForm(<VisitForm toggleVisitForm={toggleVisitForm} />)
    }
  }

  useEffect(() => {
    if (currentForm === null) {
      setIsFormActive(false)
    } else {
      setIsFormActive(true)
    }
  }, [currentForm])

  return (
    <>
      <Header pageTitle='Visit' />
      <TopNav />
      <main className='h-[calc(100%-7rem)]'>
        {isFormActive ? (
          currentForm
        ) : (
          <div className='flex h-full w-screen flex-col p-4'>
            <div className='align-center flex flex-row justify-around'>
              <SearchBar
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <AddButton toggleVisitForm={toggleVisitForm} />
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
