import { Duration } from '@/types/types'

export interface DurationProps {
  id: string
  label: string
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
          defaultValue={props.defaultValue?.hours}
          onChange={props.onHourChange}
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </select>
        <div className='self-center'>:</div>
        <select
          className='form-input flex w-full rounded-r border-none text-center focus:outline-none'
          id='minutes'
          defaultValue={props.defaultValue?.minutes}
          onChange={props.onMinuteChange}
        >
          <option value={0}>00</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={45}>45</option>
        </select>
      </div>
    </div>
  )
}

export default DurationSelector
