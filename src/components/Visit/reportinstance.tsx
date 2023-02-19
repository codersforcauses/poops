import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import moment from 'moment'

import ReportInfo from '@/components/Visit/readreportinstance'
import { Incident, VetConcern } from '@/types/types'

const ReportInstance = (props: Incident | VetConcern) => {
  const [isOpen, setIsOpen] = useState(false)

  if (props.docId === undefined) return null

  return (
    <div className='m-2 flex flex-col rounded-xl bg-gray-50 p-4 shadow-lg'>
      <div className='flex justify-between'>
        <div className='font-bold'>
          <p className='text-primary'>
            {moment(props.reportTime.toDate())
              .format('YYYY-MM-DD HH:mm:ss')
              .toString()}
          </p>
          <p className='text-sm'>
            {' '}
            {!props.vetName ? 'Incident Report' : 'Vet Concern'}
          </p>
        </div>
        <div>
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
      </div>
      <ReportInfo {...props} isOpen={isOpen} />
    </div>
  )
}

export default ReportInstance