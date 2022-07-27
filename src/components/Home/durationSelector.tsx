import { Duration } from '@/types/types'

export interface DurationProps {
  id: string
  label: string
  defaultValue?: Duration
  onHourChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onMinuteChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function DurationSelector(props: DurationProps) {
  function handleHourUp() {
    const hours = document.getElementById('hours')
    if (hours == null) return
    const updated = Number(hours.value) + 1
    if (updated > 24) {
      hours.value = Number(0)
    } else {
      hours.value = updated
    }
  }
  function handleHourDown() {
    const hours = document.getElementById('hours')
    if (hours == null) return
    const updated = Number(hours.value) - 1
    if (updated >= 0) {
      hours.value = updated
    }
  }
  function handleMinUp() {
    const mins = document.getElementById('minutes')
    if (mins == null) return
    const updated = Number(mins.value) + 15
    if (updated > 45) {
      mins.value = Number(0)
    } else {
      mins.value = updated
    }
  }
  function handleMinDown() {
    const mins = document.getElementById('minutes')
    if (mins == null) return
    const updated = Number(mins.value) - 1
    if (updated >= 0) {
      mins.value = updated
    }
  }

  return (
    <div className='flex flex-col p-1'>
      <p className='font-bold'>
        <span className='text-primary'>*</span>
        {props.label}
      </p>

      <div className='flex flex-row justify-center'>
        <div>
          <label htmlFor='hours'>Hours</label>
          <div className='flex flex-row justify-center'>
            <input
              className='mx-2 my-auto flex h-9 rounded border border-[#6b7280] py-0.5 px-4 text-center focus:border-[#0066ff] focus:outline-none'
              id='hours'
              type='number'
              step='1'
              defaultValue={0}
              min={0}
              max={24}
              onChange={props.onHourChange}
            />
            <div className='flex w-5 flex-col text-sm'>
              <button
                type='button'
                className='my-0.5 rounded bg-zinc-300'
                onClick={handleHourUp}
              >
                &#9650;
              </button>
              <button
                type='button'
                className='my-0.5 rounded bg-zinc-300'
                onClick={handleHourDown}
              >
                &#9660;
              </button>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor='minutes'>Minutes</label>
          <div className='flex flex-row justify-center'>
            <input
              className='mx-2 my-auto flex h-9 w-auto rounded border border-[#6b7280] py-0.5 px-4 text-center focus:border-[#0066ff] focus:outline-none'
              id='minutes'
              type='number'
              step='15'
              defaultValue={0}
              min={0}
              max={45}
              onChange={props.onMinuteChange}
            />
            <div className='flex w-5 flex-col text-sm'>
              <button
                type='button'
                className='my-0.5 rounded bg-zinc-300'
                onClick={handleMinUp}
              >
                &#9650;
              </button>
              <button
                type='button'
                className='my-0.5 rounded bg-zinc-300'
                onClick={handleMinDown}
              >
                &#9660;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DurationSelector
