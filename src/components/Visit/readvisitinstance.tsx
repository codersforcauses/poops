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
  clientName = '',
  docId = ''
}: VisitInfoProps) => {
  const router = useRouter()
  const params = `pets=${petNames}&client=${clientName}&visitId=${docId}`

  if (docId === undefined) return null

  return (
    <>
      <div
        className={`mt-2 justify-between text-sm transition-all duration-300 ${
          isOpen ? '' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className='max-h-screen space-y-1'>
          <div>
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
            <p className='my-1 line-clamp-6'>{notes}</p>
          </div>
        </div>
        <div className='m-1 flex h-full flex-col py-2'>
          <Button
            size='small'
            onClick={() => router.push(`/visit/${docId}/report?${params}`)}
          >
            View Incident Reports and <br /> Vet Concerns History
          </Button>
        </div>
        <div className='flex items-center justify-around py-2'>
          <div className='w-2/5'>
            <Button
              size='small'
              onClick={() => router.push(`/visit/${docId}/incident?${params}`)}
            >
              Report Incident
            </Button>
          </div>
          <div className='w-2/5'>
            <Button
              size='small'
              onClick={() => router.push(`/visit/${docId}/vet?${params}`)}
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
