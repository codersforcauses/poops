import { useState } from 'react'

import {
  clientSelectOptions,
  commuteSelectOptions
} from '@/components/Home/dummyOptions'
import Form from '@/components/Home/form'
import DurationSelector from '@/components/Visit/durationselector'
import FormField from '@/components/Visit/formfield'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { Duration } from '@/types/types'
import { visitSelectOptions } from '@/utils'

import Button from '../UI/button'

function Modal() {
  const [commute, setCommute] = useState('')
  const [client, setClient] = useState('')
  const [type, setType] = useState('')
  const [walkDistance, setWalkDistance] = useState(0)
  const [startTime, setStartTime] = useState('')
  const [other, setOther] = useState('')
  const [commuteDistance, setCommuteDistance] = useState(0)
  const [duration, setDuration] = useState<Duration>({
    hours: 0,
    minutes: 0
  })
  const { setAlert } = useAlert()

  function formFilled() {
    return (
      (commute == 'Walk' ||
        commute == 'Drive' ||
        commute == 'Public Transport' ||
        (commute == 'Other' && other != '')) &&
      commuteDistance > 0 &&
      client.length > 0 &&
      (type == 'Vet' ||
        (type == 'Walk' && walkDistance > 0 && !isNaN(walkDistance))) &&
      startTime != '' &&
      (duration.hours != 0 || duration.minutes != 0)
    )
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    event.target.reset()
    setClient('')
    setType('')
    setCommute('')
    setWalkDistance(0)
    setOther('')
    setCommuteDistance(0)
    setStartTime('')
    setDuration({
      hours: 0,
      minutes: 0
    })
    setAlert({
      variant: AlertVariant.info,
      title: 'Visit has been recorded',
      text: 'Any changes can be made in Visit Page',
      position: 'bottom',
      showFor: 2500
    })
  }

  return (
    <div className='text-center'>
      <div className='rounded-lg bg-zinc-200 py-4 px-5 text-center shadow-lg sm:py-4'>
        <h1 className='text-dark-red mb-2 text-xl'>
          <b>Visit Details</b>
        </h1>
        <hr className='border-dark-red bg-dark-red text-dark-red mb-3 h-0.5' />
        <form onSubmit={handleSubmit}>
          <div>
            <Form
              id='commuteMethod'
              label='Commute Method'
              type='select'
              isNumPad={false}
              placeholder='Select...'
              isRequired={true}
              selectOptions={commuteSelectOptions}
              onChange={(e) => setCommute(String(e.target.value))}
            />
            {commute == 'Other' && (
              <Form
                id='other'
                label='Other Commute Method'
                type='text'
                isNumPad={false}
                placeholder='Enter...'
                isRequired={true}
                onChange={(e) => setOther(String(e.target.value))}
              />
            )}
            <Form
              id='commuteDistance'
              label='Commute Distance (in km)'
              type='text'
              isNumPad={true}
              placeholder='Enter...'
              isRequired={true}
              onChange={(e) => setCommuteDistance(Number(e.target.value))}
            />
            <Form
              id='client'
              label='Select Client'
              type='select'
              isNumPad={false}
              placeholder='Select...'
              isRequired={true}
              selectOptions={clientSelectOptions}
              onChange={(e) => setClient(String(e.target.value))}
            />
            <Form
              id='type'
              label='Type of Visit'
              type='select'
              isNumPad={false}
              placeholder='Select...'
              isRequired={true}
              selectOptions={visitSelectOptions}
              onChange={(e) => setType(String(e.target.value))}
            />
          </div>
          {type == 'Walk' && (
            <Form
              id='walkDistance'
              label='Walk Distance (in km)'
              type='text'
              isNumPad={true}
              placeholder='Enter...'
              isRequired={true}
              onChange={(e) => setWalkDistance(Number(e.target.value))}
            />
          )}

          <FormField
            id='startTimeInput'
            type='dateTime-local'
            placeholder='Start Time'
            label='Start Time:'
            isRequired={true}
            onChange={(event) => setStartTime(event.target.value)}
          />

          <DurationSelector
            id='duration'
            label='Duration'
            onHourChange={(event) =>
              setDuration((duration) => ({
                ...duration,
                hours: Number(event.target.value)
              }))
            }
            onMinuteChange={(event) =>
              setDuration((duration) => ({
                ...duration,
                minutes: Number(event.target.value)
              }))
            }
          />

          <Button
            className='mt-4 mb-2'
            size='medium'
            type='submit'
            disabled={!formFilled()}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Modal
