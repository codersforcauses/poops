import { ReportButton, VetConcernButton } from '@/components/Visit/buttons'
import { humanizeTimestamp } from '@/components/Visit/utils'
import { formatDuration } from '@/components/Visit/visitinstance'
import { VisitData } from '@/types/types'

const ReadOnlyVisitInstance = (props: VisitData) => {
  return (
    <>
      <div className='font-bold peer-checked:font-normal'>
        <p className='font-bold text-primary'>
          {humanizeTimestamp(props.startTime)}
        </p>
        <p className='text-sm'>{props.clientName}</p>
      </div>
      <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-screen'>
        <p>Visit Type: {props.type}</p>
        <p>Pet(s): {props.pets}</p>
        <p>End Time: {humanizeTimestamp(props.endTime)}</p>
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
