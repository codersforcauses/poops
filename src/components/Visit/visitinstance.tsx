import { Dispatch, SetStateAction, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Timestamp } from 'firebase/firestore'

import { VisitData } from '@/types/types'
import { humanizeTimestamp } from '@/utils'

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
      className='m-2 flex flex-col rounded-xl bg-gray-50 p-4 drop-shadow-default'
    >
      <div className='flex content-center justify-between'>
        <div style={{ fontWeight: isOpen ? 400 : 700 }}>
          <p className='font-bold text-primary'>
            {humanizeTimestamp(props.startTime || new Timestamp(0, 0))}
          </p>
          <p className='text-sm'>{props.clientName || 'N/A'}</p>
        </div>

        <ChevronDownIcon
          className='h-7 w-7 cursor-pointer self-center text-primary transition-transform duration-300'
          style={{
            rotate: !isOpen ? '0deg' : '180deg',
            transitionProperty: 'rotate'
          }}
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        />
      </div>
      <VisitInfo {...props} isOpen={isOpen} />
      {isOpen && <EditButton id={props.id} />}
    </div>
  )
}

export default VisitInstance
