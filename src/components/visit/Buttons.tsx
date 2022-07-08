import React from 'react'
import { useState } from 'react'

import Modal from './Modal'

export default function EditButton(prop: { isEdit: boolean }) {
  if (prop.isEdit) {
    return <CancelButton />
  } else {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='absolute right-0.5 bottom-0.5 h-6 w-6'
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
    // slightly less awful fix
    <div className='relative top-[3px]'>
      <button
        type='button'
        onClick={() => {
          setOpenModal(true)
        }}
      >
        <div className='relative h-[37px] w-[37px] rounded-full bg-primary text-xl font-semibold drop-shadow-default'>
          <p className='absolute left-[6px] bottom-[2.6px] text-4xl font-bold text-white'>
            +
          </p>
        </div>
      </button>
      {openModal && <Modal openFunc={opening} />}
    </div>
  )
}

export const CancelButton = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='absolute right-0.5 bottom-0.5 h-6 w-6'
      viewBox='0 0 20 20'
      fill='white'
    >
      <path
        fillRule='evenodd'
        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
        clipRule='evenodd'
      />
    </svg>
  )
}
