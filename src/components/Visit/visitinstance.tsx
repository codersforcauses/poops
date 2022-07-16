import React, { useState } from 'react'
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'

import { VisitData } from '@/types/types'

import { EditButton } from './buttons'
import EditableVisitInstance from './editvisitinstance'
import ReadOnlyVisitInstance from './readvisitinstance'

interface VisitInstanceProps extends VisitData {
  id: number
}

const VisitInstance = (props: VisitInstanceProps) => {
  const [isEditable, setIsEditable] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      key={props.id}
      className='m-2 flex flex-col space-y-1 rounded-xl bg-gray p-2 drop-shadow-default'
    >
      <div className='flex justify-between'>
        <div className='relative w-full'>
          <input
            type='checkbox'
            checked={isOpen}
            readOnly={true}
            className='peer absolute h-0 w-0 cursor-pointer opacity-0'
          />

          <ChevronDownIcon
            className='absolute top-3 right-5 h-6 w-6 cursor-pointer text-primary transition-transform duration-500 peer-checked:rotate-180'
            onClick={() => {
              setIsOpen(!isOpen)
              setIsEditable(false)
            }}
          />
          {isEditable ? (
            <EditableVisitInstance
              key={props.id}
              displayName={props.displayName}
              petNames={props.petNames}
              duration={props.duration}
              dateTime={props.dateTime}
              walkDist={props.walkDist}
              commuteDist={props.commuteDist}
              commuteMethod={props.commuteMethod}
              notes={props.notes}
            />
          ) : (
            <ReadOnlyVisitInstance
              key={props.id}
              displayName={props.displayName}
              petNames={props.petNames}
              duration={props.duration}
              dateTime={props.dateTime}
              walkDist={props.walkDist}
              commuteDist={props.commuteDist}
              commuteMethod={props.commuteMethod}
              notes={props.notes}
            />
          )}

          {/* Edit button */}
          <div className='invisible absolute right-4 bottom-1 h-7 w-7 rounded-full bg-primary text-primary drop-shadow-default transition-all peer-checked:visible'>
            <button
              type='button'
              onClick={() => {
                setIsEditable(!isEditable)
              }}
            >
              <EditButton isEdit={isEditable} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisitInstance
