import { Timestamp } from 'firebase/firestore'

import IncidentForm from '@/components/Visit/incidentform'
import VetForm from '@/components/Visit/vetconcernform'
import { formatDuration } from '@/components/Visit/visitinstance'
import { useVisit } from '@/context/VisitContext/context'
import { VisitData } from '@/types/types'

import Button from '../UI/button'

const formatTime = (time: Timestamp) => {
  return time.toDate().toLocaleString().slice(0, -3)
}

const ReadOnlyVisitInstance = (props: VisitData) => {
  const { setCurrentForm } = useVisit()

  return (
    <>
      <div className='font-bold peer-checked:font-normal'>
        <p className='font-bold text-primary'>{formatTime(props.startTime)}</p>
        <p className='text-sm'>{props.clientName}</p>
      </div>
      <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-screen'>
        <p>Visit Type: {props.type}</p>
        <p>Pet(s): {props.petNames}</p>
        <p>End Time: {formatTime(props.endTime)}</p>
        <p>Duration: {formatDuration(props.startTime, props.endTime)}</p>
        <p>Walk Distance: {props.walkDist.toFixed(3)} km</p>
        <p>Commute Distance: {props.commuteDist.toFixed(1)} km</p>
        <p>Commute Method: {props.commuteMethod}</p>
        <p>Notes: {props.notes}</p>
        <div className='my-2 flex justify-center gap-2'>
          {/* <Button size='medium' onClick={() => setCurrentForm(<VetForm />)}>
            Register vet concern{' '}
          </Button> */}
          <Button
            size='medium'
            onClick={() => setCurrentForm(<IncidentForm />)}
          >
            Report incident
          </Button>
          <Button
            size='medium'
            onClick={() => setCurrentForm(<VetForm />)}
          >
            Register Vet Concern
          </Button>
        </div>
      </div>
    </>
  )
}

export default ReadOnlyVisitInstance
