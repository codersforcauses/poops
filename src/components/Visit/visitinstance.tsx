import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Timestamp } from 'firebase/firestore'

import { Visit } from '@/types/types'
import { humanizeTimestamp } from '@/utils'

import { EditButton } from './buttons'
import VisitInfo from './readvisitinstance'

const VisitInstance = (props: Visit) => {
  const [isOpen, setIsOpen] = useState(false)

  if (props.docId === undefined) return null

  return (
    <div className='m-2 flex flex-col rounded-xl bg-gray-50 p-4 drop-shadow-default'>
      <div className='flex-row content-center justify-between'>
        <div>
          <div className='font-bold peer-checked:font-normal'>
            <p className='font-bold text-primary'>
              {humanizeTimestamp(props.startTime)}
            </p>
            <p className='text-sm'>{props.clientName}</p>
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
      </div>
      {isOpen && <EditButton id={props.docId} />}
    </div>
  )
}

export default VisitInstance
