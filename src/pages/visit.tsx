import { useState } from 'react'

import Header from '@/components/Header'
import IncidentForm from '@/components/IncidentForm'

const Visit = () => {
  const [isFormExpanded, setIsFormExpanded] = useState(false)
  const [isVetVisit, setIsVetVisit] = useState(false)

  return (
    <>
      {/* <Header /> */}
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
      </main>
    </>
  )
}

export default Visit
