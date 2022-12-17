import { Timestamp } from 'firebase/firestore'

import { Duration, VisitData } from '@/types/types'
import { humanizeTimestamp } from '@/utils'
import Button from '@/components/UI/button'

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
        <div className='my-2 flex justify-center gap-2'>
          <Button
            size='medium'
            // onClick={() => setCurrentForm(<IncidentForm />)}
          >
            Report incident
          </Button>
          <Button
            size='medium' /* onClick={() => setCurrentForm(<VetForm />)} */
          >
            Register Vet Concern
          </Button>
        </div>
      </div>
    </>
  )
}

export default VisitInfo
