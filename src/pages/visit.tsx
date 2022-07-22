import { useState } from 'react'

import Header from '@/components/Header'
import IncidentForm from '@/components/IncidentForm'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import { AddButton } from '@/components/Visit/buttons'
import Modal from '@/components/Visit/modal'
import SearchBar from '@/components/Visit/searchbar'
import VisitList from '@/components/Visit/visitlist'

const Visit = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)
  const [isFormExpanded, setIsFormExpanded] = useState(false)
  const [isVetVisit, setIsVetVisit] = useState(false)
  return (
    <>
      <Header pageTitle='Visit' />
      <main>
        <p>Visit Page</p>
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsVetVisit(false)
            if (isFormExpanded && !isVetVisit) {
              setIsFormExpanded(false)
            } else {
              setIsFormExpanded(true)
            }
          }}
          className='mx-auto mt-2 w-fit rounded-lg bg-primary py-1 px-4 text-lg text-white shadow-md focus:outline-primary active:bg-dark-red'
        >
          Create Incident
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsVetVisit(true)
            if (isFormExpanded && isVetVisit) {
              setIsFormExpanded(false)
              setIsVetVisit(false)
            } else {
              setIsFormExpanded(true)
            }
          }}
          className='mx-auto mt-2 w-fit rounded-lg bg-primary py-1 px-4 text-lg text-white shadow-md focus:outline-primary active:bg-dark-red'
        >
          Create Vet Incident
        </button>
        <IncidentForm
          isExpanded={isFormExpanded}
          isVetVisit={isVetVisit}
          setIsExpanded={setIsFormExpanded}
        />
        <p>Some other content</p>
        {!isModalOpen ? (
          <div className='flex w-screen flex-col p-4'>
            <div className='align-center flex flex-row justify-around'>
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
      </main>
      <NavBar />
    </>
  )
}

export default withProtected(Visit)
// export default Visit
