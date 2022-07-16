import { VisitData } from '../../types/types'

const ReadOnlyVisitInstance = (props: VisitData) => {
  return (
    <>
      <div className='font-bold peer-checked:font-normal'>
        <p className='font-bold text-primary'>{props.dateTime}</p>
        <p className='text-sm'>{props.displayName}</p>
      </div>
      <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-40'>
        <p>Pet/Pets: {props.petNames}</p>
        <p>Duration: {props.duration}</p>
        <p>Walk Metres: {props.walkDist.toFixed(3)} km</p>
        <p>Commute Metres: {props.commuteDist.toFixed(1)} km</p>
        <p>Commute Method: {props.commuteMethod}</p>
        <p>Notes: {props.notes}</p>
      </div>
    </>
  )
}

export default ReadOnlyVisitInstance
