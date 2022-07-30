import { Duration } from '@/types/types'

export interface DurationProps {
  id: string
  label: string
  defaultValue?: Duration
  onHourChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onMinuteChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const DurationSelector = (props: DurationProps) => {
  return (
    <div className='p-1'>
      <label className='font-bold'>
        <span className='text-primary'>*</span>
        {props.label}
      </label>

      <div className='flex w-full flex-row justify-center rounded border border-dark-gray'>
        <input
          className='form-input flex w-full rounded border-none text-center focus:outline-none'
          id='hours'
          type='number'
          step='1'
          defaultValue={props.defaultValue?.hours}
          min={0}
          max={24}
          onChange={props.onHourChange}
        />
        <div className='flex self-center'>:</div>
        <input
          className='form-input flex w-full rounded border-none text-center focus:outline-none'
          id='minutes'
          type='number'
          step='15'
          defaultValue={props.defaultValue?.minutes}
          min={0}
          max={45}
          onChange={props.onMinuteChange}
        />
      </div>
    </div>
  )
}

export default DurationSelector
