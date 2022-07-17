import { ReportButton, VetConcernButton } from '@/components/Visit/buttons'
import { VisitData } from '@/types/types'

const ReadOnlyVisitInstance = (props: VisitData) => {
  return (
    <>
      <div className='font-bold peer-checked:font-normal'>
        <p className='font-bold text-primary'>{props.startTime}</p>
        <p className='text-sm'>{props.displayName}</p>
      </div>
      <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-screen'>
        <p>Visit Type: {props.type}</p>
        <p>Pet/Pets: {props.petNames.join(', ')}</p>
        <p>endTime: {props.endTime}</p>
        <p>Walk Metres: {props.walkDist.toFixed(3)} km</p>
        <p>Commute Metres: {props.commuteDist.toFixed(1)} km</p>
        <p>Commute Method: {props.commuteMethod}</p>
        <p>Notes: {props.notes}</p>
        <div className='m-2 flex flex-row justify-around'>
          {
            // TODO: make stylings nice
          }
          <VetConcernButton />
          <ReportButton />
        </div>
      </div>
    </>
  )
}

export default ReadOnlyVisitInstance