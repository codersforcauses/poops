import React from 'react'
import { PencilIcon, PlusIcon, XIcon } from '@heroicons/react/solid'

interface EditButtonProps {
  isEditable: boolean
  setIsEditable: (arg: boolean) => void
}

export const EditButton = (props: EditButtonProps) => {
  return (
    <div className='invisible absolute right-4 bottom-1 h-8 w-8 rounded-full bg-primary p-1 drop-shadow-default transition-all peer-checked:visible'>
      <button
        type='button'
        onClick={() => {
          props.setIsEditable(!props.isEditable)
        }}
      >
        {props.isEditable ? (
          <XIcon className='h-full w-full text-white' />
        ) : (
          <PencilIcon className='h-full w-full text-white' />
        )}
      </button>
    </div>
  )
}

interface AddButtonProps {
  toggleModal: () => void
}

export const AddButton = ({ toggleModal }: AddButtonProps) => {
  return (
    <div className='align-center flex h-10 w-10 place-items-center self-center rounded-full bg-primary p-1 drop-shadow-default'>
      <button type='button' onClick={() => toggleModal()}>
        <PlusIcon className='flex h-full w-full self-center text-white' />
      </button>
    </div>
  )
}

export const VetConcernButton = () => {
  return (
    <div className='align-center flex flex-row justify-center rounded-md bg-primary p-2 text-center text-xs font-bold text-white drop-shadow-default'>
      <button>
        REGISTER <br /> VET CONCERN
      </button>
    </div>
  )
}

export const ReportButton = () => {
  return (
    <div className='align-center flex flex-row justify-center rounded-md bg-primary p-2 text-center text-xs font-bold text-white drop-shadow-default'>
      <button>
        REPORT <br /> INCIDENT
      </button>
    </div>
  )
}
