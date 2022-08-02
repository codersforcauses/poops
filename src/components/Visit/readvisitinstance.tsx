import { humanizeTimestamp } from '@/components/Visit/utils'
import { Duration, VisitData } from '@/types/types'

import ReadField from './readfield'

export const formatDuration = (duration: Duration) => {
  const d = `${duration.hours} ${duration.hours === 1 ? 'hr' : 'hrs'} ${
    duration.minutes
  } mins`
  return d
}

const VisitInfo = (props: VisitData) => {
  return (
    <>
      <div className='font-bold tracking-tight transition-all duration-300 peer-checked:font-normal peer-checked:tracking-normal'>
        <p className='font-bold tracking-tight text-primary'>
          {humanizeTimestamp(props.startTime)}
        </p>
        <p>{props.clientName}</p>
      </div>
      <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-screen'>
        <ReadField label='Visit Type' value={props.type} />
        <ReadField label='Pet(s)' value={props.petNames} />
        <ReadField label='Duration' value={formatDuration(props.duration)} />
        <ReadField
          label='Walk Distance'
          value={`${props.walkDist.toFixed(3)} km`}
        />
        <ReadField
          label='Commute Distance'
          value={`${props.commuteDist.toFixed(1)}km`}
        />
        <ReadField label='Commute Method' value={props.commuteMethod} />
        <ReadField label='Notes' value={props.notes} />
      </div>
    </>
  )
}

export default VisitInfo
