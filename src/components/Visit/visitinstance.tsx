import React, { Dispatch, SetStateAction, useState } from 'react'
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'
import { Timestamp } from 'firebase/firestore'

import IncidentForm from '@/components/IncidentForm'
import { VisitData } from '@/types/types'

import { EditButton } from './buttons'
import ExpandTransition from '../UI/expandTransition'

const formatTime = (time: Timestamp) => {
  return time.toDate().toLocaleString().slice(0, -3)
}

export interface VisitInstanceProps extends VisitData {
  set: Dispatch<SetStateAction<VisitData[]>>
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
  const [isEditable, setIsEditable] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isFormExpanded, setIsFormExpanded] = useState(false)
  const [isVetVisit, setIsVetVisit] = useState(false)

  const [incidentDetails, setIncidentDetails] = useState('')

  const recipient = 'poops@test.com'
  const subject = `Incident Alert - ${props.startTime
    .toDate()
    .toLocaleString()}`
  const body = `Incident Report, time: ${props.startTime
    .toDate()
    .toLocaleString()}, client: ${props.displayName}, pet(s): ${
    props.petNames
  }, details: ${incidentDetails}`

  return (
    <div
      key={props.id}
      className='m-2 flex flex-col space-y-1 rounded-xl bg-cream p-2 drop-shadow-default'
    >
      <input
        type='checkbox'
        checked={isOpen}
        readOnly={true}
        className='peer invisible absolute h-0 w-0 cursor-pointer'
      />
      <ChevronDownIcon
        className='absolute top-3 right-5 h-6 w-6 cursor-pointer text-primary transition-transform duration-500 peer-checked:rotate-180'
        onClick={() => {
          setIsOpen(!isOpen)
          setIsEditable(false)
        }}
      />
      <div className='font-bold'>
        <p className='font-bold text-primary'>{formatTime(props.startTime)}</p>
        <p className='text-sm'>{props.displayName}</p>
      </div>
      <input
        className='h-32 rounded-lg bg-gray-300'
        name='incidentDetails'
        value={incidentDetails}
        onChange={(event) => {
          setIncidentDetails(event.target.value)
        }}
      />
      <button>
        <a href={`mailto:${recipient}?subject=${subject}&body=${body}`}>
          Create Incident Alert
        </a>
      </button>
      {isEditable ? (
        <p>Use the modal to edit this instead</p>
      ) : (
        <ExpandTransition isExpanded={isOpen}>
          <>
            <div>
              <span className='font-bold'>Visit Type:</span> {props.type}
            </div>
            <div>
              <span className='font-bold'>Pet(s):</span> {props.petNames}
            </div>
            <div>
              <span className='font-bold'>End Time:</span>{' '}
              {formatTime(props.endTime)}
            </div>
            <div>
              <span className='font-bold'>Duration:</span>{' '}
              {formatDuration(props.startTime, props.endTime)}
            </div>
            <div>
              <span className='font-bold'>Walk Distance:</span>{' '}
              {props.walkDist.toFixed(3)} km
            </div>
            <div>
              <span className='font-bold'>Commute Distance:</span>{' '}
              {props.commuteDist.toFixed(1)} km
            </div>
            <div>
              <span className='font-bold'>Commute Method:</span>{' '}
              {props.commuteMethod}
            </div>
            <div>
              <span className='font-bold'>Notes:</span> {props.notes}
            </div>
            <hr className='my-4' />
            <div className='flex justify-center space-x-2'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsVetVisit(false)
                  if (isFormExpanded && !isVetVisit) {
                    setIsFormExpanded(false)
                  } else {
                    setIsFormExpanded(true)
                  }
                }}
                className='w-fit rounded-lg bg-primary py-1 px-4 text-lg text-white shadow-md focus:outline-primary active:bg-dark-red'
              >
                Report Incident
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsVetVisit(true)
                  if (isFormExpanded && isVetVisit) {
                    setIsFormExpanded(false)
                    setIsVetVisit(false)
                  } else {
                    setIsFormExpanded(true)
                  }
                }}
                className='w-fit rounded-lg bg-primary py-1 px-4 text-lg text-white shadow-md focus:outline-primary active:bg-dark-red'
              >
                Vet Visit
              </button>
              <EditButton
                disabled={isFormExpanded}
                isEditable={isEditable}
                setIsEditable={setIsEditable}
              />
            </div>
            <IncidentForm
              isExpanded={isFormExpanded}
              isVetVisit={isVetVisit}
              setIsExpanded={setIsFormExpanded}
            />
          </>
        </ExpandTransition>
      )}
    </div>
  )
}

export default VisitInstance
