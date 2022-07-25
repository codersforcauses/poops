import { ReportButton, VetConcernButton } from '@/components/Visit/buttons'
import { humanizeTimestamp } from '@/components/Visit/utils'
import { formatDuration } from '@/components/Visit/visitinstance'
import { findContactIndex } from '@/components/Visit/visitlist'
import { useFirestore } from '@/context/firestore'
import { VisitData } from '@/types/types'

const ReadOnlyVisitInstance = (props: VisitData) => {
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
        <p>End Time: {humanizeTimestamp(props.endTime)}</p>
        <p>Duration: {formatDuration(props.startTime, props.endTime)}</p>
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

export default ReadOnlyVisitInstance
