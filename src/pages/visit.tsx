import { useState } from 'react'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
//
import AlertExamples from '@/components/UI/alertExample'
// import { withProtected } from '@/components/PrivateRoute'

const Visit = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)
  return (
    <>
      <Header pageTitle='Visit' />
      <main>
        <p>Visit Page</p>
        <AlertExamples />
      </main>
      <NavBar />
    </>
  )
}

// export default withProtected(Visit)
export default Visit
