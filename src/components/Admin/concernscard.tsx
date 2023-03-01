import Button from '@/components/UI/button'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useMutateVetConcerns } from '@/hooks/vetconcerns'
import { Status, VetConcern } from '@/types/types'
import { formatTimestamp } from '@/utils'

const ConcernsCard = (props: VetConcern) => {
  const { mutate } = useMutateVetConcerns()
  const { setAlert } = useAlert()

  const handleResolve = () => {
    setAlert({
      variant: AlertVariant.security,
      title: 'Resolve vet concern',
      text: 'Are you sure?',
      position: 'bottom',
      confirmFunction: () => {
        const vetConcern: VetConcern = { ...props, status: Status.resolved }
        mutate(vetConcern)
      }
    })
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
