import { useRouter } from 'next/router'

import Button from '@/components/UI/button'
import { EditButton } from '@/components/Visit/buttons'
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
  notes = '',
  docId = ''
}: VisitInfoProps) => {
  const router = useRouter()

  if (docId === undefined) return null

  return (
    <div
      className='mt-2 justify-between overflow-hidden text-sm'
      style={{
        maxHeight: isOpen ? '100vh' : 0,
        transition: 'max-height 0.3s ease-in-out'
      }}
    >
      <div className='max-h-screen space-y-1'>
        <div className='space-x-1'>
          <span className='font-semibold'>Visit Type:</span>
          <span>{type}</span>
        </div>
        <div className='space-x-1'>
          <span className='font-semibold'>Pet(s):</span>
          <span>{petNames}</span>
        </div>
        <div className='space-x-1'>
          <span className='font-semibold'>Duration:</span>
          <span>{formatDuration(duration)}</span>
        </div>
        <div className='space-x-1'>
          <span className='font-semibold'>Walk Distance:</span>
          <span>{walkDist.toFixed(3)} km</span>
        </div>
        <div className='space-x-1'>
          <span className='font-semibold'>Commute Distance:</span>
          <span>{commuteDist.toFixed(1)} km</span>
        </div>
        <div className='space-x-1'>
          <span className='font-semibold'>Commute Method:</span>
          <span>{commuteMethod}</span>
        </div>
        <div>
          <div className='font-semibold'>Notes:</div>
          <p className='my-1 whitespace-pre-wrap line-clamp-6'>{notes}</p>
          {notes.length > 100 && (
            <Button
              size='small'
              intent='secondary'
              onClick={() => router.push(`/visit/${docId}/notes`)}
            >
              See More
            </Button>
          )}
        </div>
      </div>
      <div className='flex h-full items-center justify-around py-2'>
        <div className='h-full'>
          <Button
            size='small'
            onClick={() => router.push(`/visit/${docId}/incident`)}
          >
            Report Incident
          </Button>
        </div>
        <div className='h-full'>
          <Button
            size='small'
            onClick={() => router.push(`/visit/${docId}/vet`)}
          >
            Register Vet Concern
          </Button>
        </div>
        <div className='h-full'>
          <EditButton id={docId} />
        </div>
      </div>
    </div>
  )
}

export default VisitInfo
