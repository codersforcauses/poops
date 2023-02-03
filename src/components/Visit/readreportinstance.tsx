import { useRouter } from 'next/router'

import Button from '@/components/UI/button'
import { Incident } from '@/types/types'

interface ReportInfoProps extends Incident {
  isOpen: boolean
}

const ReportInfo = ({
  isOpen,
  docId = '',
  userID = '',
  userName = '',
  visitId = '',
  visitTime = '',
  clientName = '',
  email = '',
  petName = '',
  time = '',
  details = '',
  createdAt = ''
}: ReportInfoProps) => {
  const router = useRouter()
  const params = `pets=${petName}&client=${clientName}&visitId=${docId}`

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
            <span>{}</span>
          </div>
          <div className='space-x-1'>
            <span className='font-semibold'>Pet(s):</span>
            <span>{petName}</span>
          </div>
          <div className='space-x-1'>
            <span className='font-semibold'>Duration:</span>
            <span>{}</span>
          </div>
          <div className='space-x-1'>
            <span className='font-semibold'>Walk Distance:</span>
            <span>{} km</span>
          </div>
          <div className='space-x-1'>
            <span className='font-semibold'>Commute Distance:</span>
            <span>{} km</span>
          </div>
          <div className='space-x-1'>
            <span className='font-semibold'>Commute Method:</span>
            <span>{}</span>
          </div>
          <div>
            <div className='font-semibold'>Notes:</div>
            <p className='my-1 line-clamp-6'>{}</p>
          </div>
        </div>
        <div className='flex items-center justify-around py-2'>
          <div className='w-fit'>
            <Button
              size='small'
              onClick={() => router.push(`/visit/${docId}/report?${params}`)}
            >
              Remove
            </Button>
          </div>
          <div className='w-fit'>
            <Button
              size='small'
              onClick={() => router.push(`/visit/${docId}/report?${params}`)}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportInfo
