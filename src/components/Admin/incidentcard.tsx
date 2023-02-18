import { Incident } from '@/types/types'

const IncidentCard = (props: Incident) => {
  return (
    <div className='m-2 flex flex-col rounded-xl bg-gray-50 p-4 drop-shadow-default'>
      <div className='flex justify-between'>
        <div className='font-bold'>
          <p className='font-bold text-primary'>
            {props.clientName} {props.reportTime}
          </p>
          <p className='text-sm'>{props.userName}</p>
        </div>
      </div>
      <div>{props.userEmail}</div>
      <div>Report date: {props.reportTime}</div>
      <div>Visit ID: {props.visitId}</div>
      <div>Client: {props.clientName}</div>
      <div>Pet: {props.petName}</div>
      <div>{props.detail}</div>
    </div>
  )
}

export default IncidentCard
