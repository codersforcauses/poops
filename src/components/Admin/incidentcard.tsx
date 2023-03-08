import Image from 'next/image'

import Button from '@/components/UI/button'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useMutateIncidents } from '@/hooks/incidents'
import { Incident, Status } from '@/types/types'
import { formatTimestamp } from '@/utils'

const IncidentCard = (props: Incident) => {
  const { mutate } = useMutateIncidents()
  const { setAlert } = useAlert()

  const handleResolve = () => {
    setAlert({
      variant: AlertVariant.security,
      title: 'Resolve Incident',
      text: 'Are you sure?',
      position: 'bottom',
      confirmFunction: () => {
        const incident: Incident = { ...props, status: Status.resolved }
        mutate(incident)
      }
    })
  }

  return (
    <div className='m-2 flex flex-col gap-2 rounded-xl bg-gray-50 p-4 shadow-lg'>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <div className='font-bold'>
            <p className='font-bold text-primary'>
              {props.clientName} {formatTimestamp(props.time)}
            </p>
            <p className='text-sm'>{props.userName}</p>
          </div>
        </div>
        <div>{props.email}</div>
        <div>Report date: {formatTimestamp(props.createdAt)}</div>
        <div>Visit ID: {props.visitId}</div>
        <div>Client: {props.clientName}</div>
        <div>Pet: {props.petName}</div>
        <div>{props.details}</div>
        {props?.imageUrl && (
          <Image
            src={props.imageUrl}
            alt='Uploaded Photo'
            width={300}
            height={300}
            layout='responsive'
            objectFit='contain'
          />
        )}
      </div>
      <div className='flex justify-around'>
        <Button onClick={handleResolve}>Mark as Resolved</Button>
      </div>
    </div>
  )
}

export default IncidentCard
