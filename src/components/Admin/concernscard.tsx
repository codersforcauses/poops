import { VetConcern } from '@/types/types'
import { formatTimestamp } from '@/utils'

const ConcernsCard = (props: VetConcern) => {
  return (
    <div className='m-2 flex flex-col rounded-xl bg-gray-50 p-4 shadow-lg'>
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
  )
}

export default ConcernsCard
