import { Concerns } from '@/types/types'

const ConcernsCard = (props: Concerns) => {
  return (
    <div className='m-2 flex flex-col rounded-xl bg-gray-50 p-4 drop-shadow-default'>
      <div>{props.user_uid}</div>
      <div>{props.user_name}</div>
      <div>{props.user_email}</div>
      <div>{props.user_phone}</div>
      <div>{props.client_name}</div>
      <div>{props.pet_name}</div>
      <div>{props.visit_time}</div>
      <div>{props.visit_id}</div>
      <div>{props.detail}</div>
      <div>{props.created_at}</div>
    </div>
  )
}

export default ConcernsCard
