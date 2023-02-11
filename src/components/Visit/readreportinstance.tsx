import { useRouter } from 'next/router'
import { serverTimestamp, Timestamp } from 'firebase/firestore'

import Button from '@/components/UI/button'
import { Incident } from '@/types/types'
import { humanizeTimestamp } from '@/utils'

interface ReportInfoProps extends Incident {
  isOpen: boolean
}

const ReportInfo = ({
  isOpen,
  docId = '',
  imageBucket = '',
  clientName = '',
  petName = '',
  reportTime = serverTimestamp() as Timestamp,
  detail = ''
}: ReportInfoProps) => {
  const router = useRouter()
  const params = `pets=${petName}&client=${clientName}&visitId=${docId}`

  if (docId === undefined) return null

  console.log(reportTime)

  return (
    <>
      <div
        className={`mt-2 justify-between text-sm transition-all duration-300 ${
          isOpen ? '' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className='max-h-screen space-y-1'>
          <div className='space-x-1'>
            <span className='font-semibold'>Pet Name:</span>
            <span>{petName}</span>
          </div>
          <div className='space-x-1'>
            <span className='font-semibold'>Report Date & Time:</span>
            <span>{reportTime.toString()}</span>
          </div>
          <div>
            <div className='font-semibold'>Desscription:</div>
            <p className='my-1 line-clamp-6'>{detail}</p>
          </div>
          <div>
            <div className='font-semibold'>Photo:</div>
            <p className='my-1 line-clamp-6'>{imageBucket}</p>
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
