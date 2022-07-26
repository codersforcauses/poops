import React, { Dispatch, SetStateAction, useState } from 'react'
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'

import { VisitData } from '@/types/types'

import { EditButton } from './buttons'
import VisitInfo from './readvisitinstance'

export interface VisitInstanceProps extends VisitData {
  setVisits: Dispatch<SetStateAction<VisitData[]>>
  id: number
}

const VisitInstance = (props: VisitInstanceProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      key={props.id}
      className='m-2 flex flex-col space-y-1 rounded-xl bg-cream p-2 drop-shadow-default'
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
            }}
          />
          <VisitInfo {...props} />
          <EditButton id={props.id} />
        </div>
      </div>
    </div>
  )
}

export default VisitInstance
