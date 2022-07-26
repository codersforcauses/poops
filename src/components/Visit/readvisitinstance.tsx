import { ReportButton, VetConcernButton } from '@/components/Visit/buttons'
import { findContactIndex, humanizeTimestamp } from '@/components/Visit/utils'
import { useFirestore } from '@/context/firestore'
import { Duration, VisitData } from '@/types/types'

// I hate math
export const formatDuration = (duration: Duration) => {
  const d = `${duration.hours} ${duration.hours === 1 ? 'hr' : 'hrs'} ${
    duration.minutes
  } mins`
  return d
}

const VisitInfo = (props: VisitData) => {
  const { userDoc } = useFirestore()
  return (
    <>
      <div className='font-bold peer-checked:font-normal'>
        <p className='font-bold text-primary'>
          {humanizeTimestamp(props.startTime)}
        </p>
        <p className='text-sm'>
          {
            userDoc.contacts[findContactIndex(props.clientId, userDoc)]
              .displayName
          }
        </p>
      </div>
      <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-screen'>
        <p>Visit Type: {props.type}</p>
        <p>Pet(s): {props.petNames}</p>
        <p>Duration: {formatDuration(props.duration)}</p>
        <p>Walk Distance: {props.walkDist.toFixed(3)} km</p>
        <p>Commute Distance: {props.commuteDist.toFixed(1)} km</p>
        <p>Commute Method: {props.commuteMethod}</p>
        <p>Notes: {props.notes}</p>
        <div className='m-2 flex flex-row justify-around'>
          <VetConcernButton />
          <ReportButton />
        </div>
      </div>
    </>
  )
}

export default VisitInfo
