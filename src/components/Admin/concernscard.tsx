import { Concerns } from '@/types/types'

const ConcernsCard = (props: Concerns) => {
  return (
    <div className='m-2 flex flex-col rounded-xl bg-gray-50 p-4 drop-shadow-default'>
      <div>User ID: {props.user_uid}</div>
      <div>User Name: {props.user_name}</div>
      <div>User Email: {props.user_email}</div>
      <div>User Phone: {props.user_phone}</div>
      <div>Client Name: {props.client_name}</div>
      <div>Pet Name: {props.pet_name}</div>
      <div>Visit Time: {props.visit_time.toString()}</div>
      <div>Visit ID: {props.visit_id}</div>
      <div>Detail: {props.detail}</div>
      <div>Created At: {props.created_at.toString()}</div>
    </div>
  )
}

export default ConcernsCard
