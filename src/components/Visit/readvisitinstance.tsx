import { useState } from 'react'
import { Timestamp } from 'firebase/firestore'

import IncidentForm from '@/components/IncidentForm'
import { formatDuration } from '@/components/Visit/visitinstance'
import { VisitData } from '@/types/types'

const formatTime = (time: Timestamp) => {
  return time.toDate().toLocaleString().slice(0, -3)
}

const ReadOnlyVisitInstance = (props: VisitData) => {
  const [isFormExpanded, setIsFormExpanded] = useState(false)
  const [isVetVisit, setIsVetVisit] = useState(false)

  return (
    <>
      <div className='font-bold peer-checked:font-normal'>
        <p className='font-bold text-primary'>{formatTime(props.startTime)}</p>
        <p className='text-sm'>{props.displayName}</p>
      </div>
      <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-screen'>
        <p>Visit Type: {props.type}</p>
        <p>Pet(s): {props.petNames}</p>
        <p>End Time: {formatTime(props.endTime)}</p>
        <p>Duration: {formatDuration(props.startTime, props.endTime)}</p>
        <p>Walk Distance: {props.walkDist.toFixed(3)} km</p>
        <p>Commute Distance: {props.commuteDist.toFixed(1)} km</p>
        <p>Commute Method: {props.commuteMethod}</p>
        <p>Notes: {props.notes}</p>
        <div className='m-2 flex flex-col justify-around'>
          <div className='flex space-x-1'>
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
              className='mx-auto mt-2 w-fit rounded-lg bg-primary py-1 px-4 text-lg text-white shadow-md focus:outline-primary active:bg-dark-red'
            >
              Create Incident
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
              className='mx-auto mt-2 w-fit rounded-lg bg-primary py-1 px-4 text-lg text-white shadow-md focus:outline-primary active:bg-dark-red'
            >
              Create Vet Incident
            </button>
          </div>
          <IncidentForm
            isExpanded={isFormExpanded}
            isVetVisit={isVetVisit}
            setIsExpanded={setIsFormExpanded}
          />
        </div>
      </div>
    </>
  )
}

export default ReadOnlyVisitInstance
