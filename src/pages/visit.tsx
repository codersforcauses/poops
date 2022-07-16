import { useState } from 'react'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { AddButton } from '@/components/Visit/buttons'
import Modal from '@/components/Visit/modal'
import SearchBar from '@/components/Visit/searchbar'
import VisitList from '@/components/Visit/visitlist'
// import { withProtected } from '@/components/PrivateRoute'

const Visit = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)
  return (
    <>
      <Header pageTitle='Visit' />
      <main>
        <>
          {!isModalOpen ? (
            <div className='flex w-screen flex-col p-4'>
              <div className='flex flex-row justify-around'>
                <SearchBar
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                <AddButton toggleModal={toggleModal} />
              </div>

              <VisitList searchQuery={searchQuery} />
            </div>
          ) : (
            <Modal toggleModal={toggleModal} />
          )}
        </>
      </main>
      <NavBar />
    </>
  )
}

// export default withProtected(Visit)
export default Visit
