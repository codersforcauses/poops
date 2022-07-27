import { Duration } from '@/types/types'

export interface DurationProps {
  id: string
  label: string
  defaultValue?: Duration
  onHourChange: (event: string) => void
  onMinuteChange: (event: string) => void
}

function DurationSelector(props: DurationProps) {
  function handleHourUp() {
    const hours = document.getElementById('hours') as HTMLInputElement
    if (hours == null) return
    let updated = Number(hours.value) + 1
    if (updated > 24) {
      updated = 0
      hours.value = '0'
    } else {
      hours.value = updated.toString()
    }
    props.onHourChange(updated.toString())
  }
  function handleHourDown() {
    const hours = document.getElementById('hours') as HTMLInputElement
    if (hours == null) return
    let updated = Number(hours.value)
    if (Number(updated) != 0) {
      updated -= 1
    }
    if (updated >= 0) {
      hours.value = updated.toString()
    }
    props.onHourChange(updated.toString())
  }
  function handleMinUp() {
    const mins = document.getElementById('minutes') as HTMLInputElement
    if (mins == null) return
    let updated = Number(mins.value) + 15
    if (updated > 45) {
      updated = 0
      mins.value = '0'
    } else {
      mins.value = updated.toString()
    }
    props.onMinuteChange(updated.toString())
  }
  function handleMinDown() {
    const mins = document.getElementById('minutes') as HTMLInputElement
    if (mins == null) return
    let updated = Number(mins.value)
    if (Number(updated) != 0) {
      updated -= 15
    }
    if (updated >= 0) {
      mins.value = updated.toString()
    }
    props.onMinuteChange(updated.toString())
  }

  return (
    <div className='flex flex-col p-1'>
      <p className='font-bold'>
        <span className='text-primary'>*</span>
        {props.label}
      </p>

      <div className='flex flex-row justify-center'>
        <div className='mr-2'>
          <label htmlFor='hours'>Hours</label>
          <div className='flex flex-row justify-center'>
            <input
              className='my-auto mr-2 flex h-9 rounded border border-[#6b7280] py-0.5 px-4 text-center focus:border-[#0066ff] focus:outline-none'
              id='hours'
              type='number'
              step='1'
              defaultValue={0}
              min={0}
              max={24}
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

        <div className='ml-2'>
          <label htmlFor='minutes'>Minutes</label>
          <div className='flex flex-row justify-center'>
            <input
              className='my-auto mr-2 flex h-9 w-auto rounded border border-[#6b7280] py-0.5 px-4 text-center focus:border-[#0066ff] focus:outline-none'
              id='minutes'
              type='number'
              step='15'
              defaultValue={0}
              min={0}
              max={45}
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
