import moment from 'moment'

import { ReportButton, VetConcernButton } from '@/components/Visit/buttons'
import { VisitData } from '@/types/types'

const ReadOnlyVisitInstance = (props: VisitData) => {
  const formatDuration = () => {
    const start = moment(props.startTime)
    const diff = moment(props.endTime).diff(start)
    // does not work for durations more than 24 hours
    const format = moment.utc(diff).format('H [hrs] m [mins]')
    return format
  }

  return (
    <>
      <div className='font-bold peer-checked:font-normal'>
        <p className='font-bold text-primary'>{props.startTime}</p>
        <p className='text-sm'>{props.displayName}</p>
      </div>
      <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-screen'>
        <p>Visit Type: {props.type}</p>
        <p>Pet(s): {props.petNames}</p>
        <p>End Time: {props.endTime}</p>
        <p>Duration: {formatDuration()}</p>
        <p>Walk Metres: {props.walkDist.toFixed(3)} km</p>
        <p>Commute Metres: {props.commuteDist.toFixed(1)} km</p>
        <p>Commute Method: {props.commuteMethod}</p>
        <p>Notes: {props.notes}</p>
        <div className='m-2 flex flex-row justify-around'>
          {
            // TODO: make stylings nice (gl James)
          }
          <VetConcernButton />
          <ReportButton />
        </div>
      </div>
    </>
  )
}

export default ReadOnlyVisitInstance
