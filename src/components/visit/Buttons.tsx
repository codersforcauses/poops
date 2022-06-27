import React from 'react'
import { useState } from 'react'

import Modal from './Modal'

export default function EditButton() {
  return (
    <button type='button' className='text-red-500'>
      Edit!
    </button>
  )
}

export const AddButton = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className=' absolute right-5 bottom-20 bg-red-500 py-2 px-5 '>
      <button
        type='button'
        className='text bg-red-500 text-white'
        onClick={() => {
          setOpenModal(true)
        }}
      >
        Add visit
      </button>
      {openModal && <Modal closeModal={setOpenModal} />}
    </div>
  )
}
