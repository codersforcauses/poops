import { Timestamp } from 'firebase/firestore'

import { humanizeTimestamp } from '@/components/Visit/utils'
import { Duration, VisitData } from '@/types/types'

export const formatDuration = (duration: Duration) => {
  const d = `${duration.hours} ${duration.hours === 1 ? 'hr' : 'hrs'} ${
    duration.minutes
  } mins`
  return d
}

const VisitInfo = ({
  startTime = new Timestamp(0, 0),
  clientName = 'N/A',
  type = 'N/A',
  petNames = 'N/A',
  duration = { hours: 0, minutes: 0 },
  walkDist = 0,
  commuteDist = 0,
  commuteMethod = 'N/A',
  notes = ''
}: VisitData) => {
  return (
    <>
      <div className='font-bold peer-checked:font-normal'>
        <p className='font-bold text-primary'>{humanizeTimestamp(startTime)}</p>
        <p className='text-sm'>{clientName}</p>
      </div>
      <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-screen'>
        <p>Visit Type: {type}</p>
        <p>Pet(s): {petNames}</p>
        <p>Duration: {formatDuration(duration)}</p>
        <p>Walk Distance: {walkDist.toFixed(3)} km</p>
        <p>Commute Distance: {commuteDist.toFixed(1)} km</p>
        <p>Commute Method: {commuteMethod}</p>
        <p>Notes: {notes}</p>
      </div>
    </>
  )
}

export default VisitInfo
