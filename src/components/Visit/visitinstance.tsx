import React, { Dispatch, SetStateAction, useState } from 'react'
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'
import { Timestamp } from 'firebase/firestore'

import { VisitData } from '@/types/types'

import { EditButton } from './buttons'
import VisitInfo from './readvisitinstance'

export interface VisitInstanceProps extends VisitData {
  setVisits: Dispatch<SetStateAction<VisitData[]>>
  id: number
}

// I hate math
export const formatDuration = (startTime: Timestamp, endTime: Timestamp) => {
  const start = startTime.toDate().getTime()
  const end = endTime.toDate().getTime()
  const diff = end - start

  if (diff < 0) return 'Start Time is after End Time'

  const hours = diff / 3600000
  const floorHours = Math.floor(hours)
  const mins = (hours - floorHours) * 60
  return `${floorHours} hrs ${Math.round(mins)} mins`
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
          <EditButton id={props.id + 1} />
        </div>
      </div>
    </div>
  )
}

export default VisitInstance
