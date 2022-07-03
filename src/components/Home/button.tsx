import React from 'react'
import { useState } from 'react'

import Modal from '@/components/Home/modal'

function Button() {
  const [modalIsOpen, setModalOpen] = useState(false)

  return (
    <div>
      {!modalIsOpen && (
        <button
          className='relative h-[37px] w-[150px] rounded-lg bg-poops-dark-red text-xl font-semibold text-white'
          onClick={() => {
            setModalOpen(true)
          }}
        >
          START VISIT
        </button>
      )}
      {modalIsOpen && (
        <button
          className='relative h-[37px] w-[150px] rounded-lg bg-poops-dark-red text-xl font-semibold text-white'
          onClick={() => {
            setModalOpen(false)
          }}
        >
          STOP VISIT
        </button>
      )}
      {modalIsOpen && <Modal />}
    </div>
  )
}

export default Button
