import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '@/components/UI/button'
import { Duration, Visit } from '@/types/types'

import { EditButton } from './buttons'

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
  docId,
  type = 'N/A',
  petNames = 'N/A',
  duration = { hours: 0, minutes: 0 },
  walkDist = 0,
  commuteDist = 0,
  commuteMethod = 'N/A',
  notes = ''
}: VisitInfoProps) => {
  const router = useRouter()

  if (docId === undefined) return null

  const paragraphs = notes.split('\n')
  return (
    <>
      <div
        className={`justify-between text-sm transition-all duration-300 ${
          isOpen ? '' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className='max-h-screen overflow-hidden'>
          <p>Visit Type: {type}</p>
          <p>Pet(s): {petNames}</p>
          <p>Duration: {formatDuration(duration)}</p>
          <p>Walk Distance: {walkDist.toFixed(3)} km</p>
          <p>Commute Distance: {commuteDist.toFixed(1)} km</p>
          <p>Commute Method: {commuteMethod}</p>
          <p>Notes: </p>
          {paragraphs.map((paragraph, i) => {
            return <p key={i}> {paragraph}</p>
          })}
        </div>

        <div className='flex items-center justify-around py-2'>
          <div className='w-2/5'>
            <Button
              size='small'
              onClick={() => router.push(`/visit/${docId}/incident`)}
            >
              Report Incident
            </Button>
          </div>
          <div className='w-2/5'>
            <Button
              size='small'
              onClick={() => router.push(`/visit/${docId}/vet`)}
            >
              Register Vet Concern
            </Button>
          </div>
          <div className='w-fit'>
            <EditButton id={docId} />
          </div>
        </div>
      </div>
    </>
  )
}

export default VisitInfo
