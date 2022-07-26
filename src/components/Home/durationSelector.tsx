export type Duration = {
  hours: number
  minutes: number
}

export interface DurationProps {
  id: string
  label: string
  onHourChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onMinuteChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function DurationSelector(props: DurationProps) {
  return (
    <div className='flex flex-col p-1'>
      <p className='font-bold'>
        <span className='text-primary'>*</span>
        {props.label}
      </p>

      <div className='flex flex-row justify-center'>
        <div>
          <label htmlFor='hours'>Hours</label>
          <input
            className='mx-2 mt-1 mb-2 flex h-9 rounded border border-[#6b7280] py-0.5 px-4 text-center focus:outline-none'
            id='hours'
            type='number'
            step='1'
            defaultValue={0}
            min={0}
            max={24}
            onChange={props.onHourChange}
          />
        </div>
        <div>
          <label htmlFor='minutes'>Minutes</label>
          <input
            className='mx-2 mt-1 mb-2 flex h-9 w-auto rounded border border-[#6b7280] py-0.5 px-4 text-center focus:outline-none'
            id='minutes'
            type='number'
            step='15'
            defaultValue={0}
            min={0}
            max={45}
            onChange={props.onMinuteChange}
          />
        </div>
      </div>
    </div>
  )
}

export default DurationSelector
