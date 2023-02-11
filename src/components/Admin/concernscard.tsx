import { VetConcern } from '@/types/types'
import { formatTimestamp } from '@/utils'

const ConcernsCard = (props: VetConcern) => {
  return (
    <div className='m-2 flex flex-col rounded-xl bg-gray-50 p-4 drop-shadow-default'>
      <div>User ID: {props.userId}</div>
      <div>User Name: {props.userName}</div>
      <div>User Email: {props.userEmail}</div>
      <div>User Phone: {props.userPhone}</div>
      <div>Client Name: {props.clientName}</div>
      <div>Pet Name: {props.petName}</div>
      <div>Visit Time: {formatTimestamp(props.visitTime)}</div>
      <div>Visit ID: {props.visitId}</div>
      <div>Detail: {props.detail}</div>
      <div>Created At: {formatTimestamp(props.createdAt)}</div>
    </div>
  )
}

export default ConcernsCard
//  testing
