import React from 'react'
import { useState } from 'react'

import Modal from './Modal'

export default function EditButton() {
  return (
    <button type='button' className='bg-poops-red'>
      Edit!
    </button>
  )
}

export const AddButton = () => {
  const [openModal, setOpenModal] = useState(false)
  const opening = () => {
    if (openModal) {
      setOpenModal(false)
    } else {
      setOpenModal(true)
    }
  }
  return (
    <div className='absolute right-5 bottom-20 bg-poops-red py-2 px-5 '>
      <button
        type='button'
        className='text bg-poops-red text-white'
        onClick={() => {
          setOpenModal(true)
        }}
      >
        Add visit
      </button>
      {openModal && <Modal openfunc={opening} />}
    </div>
  )
}
