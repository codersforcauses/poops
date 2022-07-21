import { Timestamp } from 'firebase/firestore'

import { ReportButton, VetConcernButton } from '@/components/Visit/buttons'
import { formatDuration } from '@/components/Visit/visitinstance'
import { VisitData } from '@/types/types'

const formatTime = (time: Timestamp) => {
  return time.toDate().toLocaleString().slice(0, -3)
}

const ReadOnlyVisitInstance = (props: VisitData) => {
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
        <div className='m-2 flex flex-row justify-around'>
          {
            // TODO: make stylings nice (gl James)
          }
          <VetConcernButton />
          <ReportButton />
        </div>
      </div>
    </>
  )
}

export default ReadOnlyVisitInstance
