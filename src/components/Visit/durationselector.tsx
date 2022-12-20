import { Duration } from '@/types/types'
import { padNumber } from '@/utils'

export interface DurationProps {
  id: string
  label: string
  value?: Duration
  defaultValue?: Duration
  onHourChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onMinuteChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const DurationSelector = (props: DurationProps) => {
  return (
    <div className='flex flex-col'>
      <label className='font-bold'>
        <span className='text-primary'>*</span>
        {props.label}
      </label>

      <div className='flex w-full flex-row justify-center rounded border border-dark-gray bg-white'>
        <select
          className='form-input flex w-full overflow-scroll rounded-l border-none text-center focus:outline-none'
          id='hours'
          value={props.value?.hours}
          defaultValue={props.defaultValue?.hours}
          onChange={props.onHourChange}
        >
          {Array.from(Array(10), (_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <div className='self-center'>:</div>
        <select
          className='form-input flex w-full rounded-r border-none text-center focus:outline-none'
          id='minutes'
          value={props.value?.minutes}
          defaultValue={props.defaultValue?.minutes}
          onChange={props.onMinuteChange}
        >
          {Array.from(Array(4), (_, i) => (
            <option key={i} value={i * 15}>
              {padNumber(i * 15)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default DurationSelector
