import React from 'react'
import { useState } from 'react'

import Modal from './Modal'

export default function EditButton() {
  return (
    <button type='button' className=''>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='absolute right-0.5 bottom-0.5 h-4 w-4'
        fill='white'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='1'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
        />
      </svg>
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
      {openModal && <Modal openFunc={opening} />}
    </div>
  )
}
