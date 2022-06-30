import React from 'react'
import { useState } from 'react'

import Modal from './Modal'

export default function EditButton() {
  return (
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
    //awful fix
    <div className='absolute top-[96px] right-[31px] '>
      <button
        type='button'
        onClick={() => {
          setOpenModal(true)
        }}
      >
        <div className='relative h-[37px] w-[37px] rounded-full bg-poops-dark-red text-xl font-semibold'>
          <p className='absolute top-1 left-3 text-white'>+</p>
        </div>
      </button>
      {openModal && <Modal openFunc={opening} />}
    </div>
  )
}
