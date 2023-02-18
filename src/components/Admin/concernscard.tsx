import Button from '@/components/UI/button'
import { VetConcern } from '@/types/types'
import { formatTimestamp } from '@/utils'

const ConcernsCard = (props: VetConcern) => {
  const handleResolve = () => {
    // send request to resolve concern
    // if successful, remove card from page, show success with option to undo?
  }

  return (
    <div className='m-2 flex flex-col gap-2 rounded-xl bg-gray-50 p-4 shadow-lg'>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <div className='font-bold'>
            <p className='font-bold text-primary'>
              {props.clientName} {formatTimestamp(props.visitTime)}
            </p>
            <p className='text-sm'>{props.userName}</p>
          </div>
        </div>
        <div>{props.userEmail}</div>
        <div>Report date: {formatTimestamp(props.createdAt)}</div>
        <div>User Phone: {props.userPhone}</div>
        <div>Visit ID: {props.visitId}</div>
        <div>Client: {props.clientName}</div>
        <div>Pet: {props.petName}</div>
        <div>{props.detail}</div>
      </div>
      <div className='flex justify-center'>
        <Button onClick={handleResolve}>Mark as Resolved</Button>
      </div>
    </div>
  )
}

export default ConcernsCard
