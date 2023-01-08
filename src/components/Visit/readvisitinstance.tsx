import Link from 'next/link'

import Button from '@/components/UI/button'
import { Duration, Visit } from '@/types/types'

export const formatDuration = (duration: Duration) => {
  const d = `${duration.hours} ${duration.hours === 1 ? 'hr' : 'hrs'} ${
    duration.minutes
  } mins`
  return d
}

interface VisitInfoProps extends Visit {
  isOpen: boolean
}

const VisitInfo = ({
  isOpen,
  type = 'N/A',
  petNames = 'N/A',
  duration = { hours: 0, minutes: 0 },
  walkDist = 0,
  commuteDist = 0,
  commuteMethod = 'N/A',
  notes = ''
}: VisitInfoProps) => {
  return (
    <>
      <div
        className={`justify-between overflow-hidden text-sm transition-all duration-300 ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <p>Visit Type: {type}</p>
        <p>Pet(s): {petNames}</p>
        <p>Duration: {formatDuration(duration)}</p>
        <p>Walk Distance: {walkDist.toFixed(3)} km</p>
        <p>Commute Distance: {commuteDist.toFixed(1)} km</p>
        <p>Commute Method: {commuteMethod}</p>
        <p>Notes: {notes}</p>
        <div className='my-2 mr-9 flex justify-start gap-2'>
          <Link href='/visit/incident'>
            <Button size='small'>Report Incident</Button>
          </Link>
          <Link href='/visit/vet'>
            <Button size='small'>Register Vet Concern</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default VisitInfo
