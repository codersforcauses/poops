import { Incident } from '@/types/types'

const IncidentCard = (props: Incident) => {
  return (
    <div className='m-2 flex flex-col rounded-xl bg-gray-50 p-4 drop-shadow-default'>
      <div className='flex justify-between'>
        <div className='font-bold'>
          <p className='font-bold text-primary'>{props.time}</p>
          <p className='text-sm'>{props.userName}</p>
        </div>
      </div>
      <div>{props.email}</div>
      <div>{props.petName}</div>
      <div>{props.details}</div>
    </div>
  )
}

export default IncidentCard
