import Button from '@/components/UI/button'
import { humanizeTimestamp } from '@/components/Visit/utils'
import { Duration, VisitData } from '@/types/types'

export const formatDuration = (duration: Duration) => {
  const d = `${duration.hours} ${duration.hours === 1 ? 'hr' : 'hrs'} ${
    duration.minutes
  } mins`
  return d
}

const VisitInfo = (props: VisitData) => {
  return (
    <>
      <div className='font-bold peer-checked:font-normal'>
        <p className='font-bold text-primary'>
          {humanizeTimestamp(props.startTime)}
        </p>
        <p className='text-sm'>{props.clientName}</p>
      </div>
      <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-screen'>
        <p>Visit Type: {props.type}</p>
        <p>Pet(s): {props.petNames}</p>
        <p>Duration: {formatDuration(props.duration)}</p>
        <p>Walk Distance: {props.walkDist.toFixed(3)} km</p>
        <p>Commute Distance: {props.commuteDist.toFixed(1)} km</p>
        <p>Commute Method: {props.commuteMethod}</p>
        <p>Notes: {props.notes}</p>
        <div className='my-2 flex justify-center gap-2'>
          <Button size='medium'>Register vet concern </Button>
          <Button size='medium'>Report incident</Button>
        </div>
      </div>
    </>
  )
}

export default VisitInfo
