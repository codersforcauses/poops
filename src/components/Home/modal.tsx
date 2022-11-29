import { useState } from 'react'
import { Timestamp } from 'firebase/firestore'

import DurationSelector from '@/components/Home/durationSelector'
import CommuteSelector from '@/components/Visit/commuteselector'
import FormField from '@/components/Visit/formfield'
import { visitSelectOptions } from '@/components/Visit/visitlist'
import { AlertVariant, useAlert } from '@/context/AlertContext'
<<<<<<< HEAD
import { Duration, VisitData} from '@/types/types'
import Button from '../UI/button'
=======
import { useFirestore } from '@/context/Firebase/Firestore/context'
>>>>>>> 37d42e3 (Add firestore integration to push visit data)

function Modal() {
  const { userDoc, updateVisit } = useFirestore()
  const [commute, setCommute] = useState('')
  const [client, setClient] = useState('')
  const [petNames, setPetNames] = useState('')
  const [type, setType] = useState('')
  const [walkDistance, setWalkDistance] = useState(0)
  const [startTime, setStartTime] = useState('')
  const [commuteDistance, setCommuteDistance] = useState(0)
  const [duration, setDuration] = useState<Duration>({
    hours: 0,
    minutes: 0
  })
  const { setAlert } = useAlert()

  function formFilled() {
    return (
      commute &&
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

    // adding duration to start time to get end date
    const endDate: Date = new Date(startTime)
    endDate.setHours(endDate.getHours() + duration.hours)
    endDate.setMinutes(endDate.getMinutes() + duration.minutes)

    // pushing data to firebase store
    const data: VisitData = {
      type: type,
      clientName: client,
      petNames: petNames,
      startTime: Timestamp.fromDate(new Date(startTime)),
      endTime: Timestamp.fromDate(endDate),
      walkDist: walkDistance,
      commuteDist: commuteDistance,
      commuteMethod: commute,
      notes: ''
    }
    userDoc.visits.push(data)
    updateVisit?.(userDoc)
  }

  return (
    <div className='text-center'>
      <div className='rounded-lg bg-zinc-200 py-4 px-5 text-center shadow-lg sm:py-4'>
        <h1 className='mb-2 text-xl text-dark-red'>
          <b>Visit Details</b>
        </h1>
        <hr className='mb-3 h-0.5 border-dark-red bg-dark-red text-dark-red' />
        <form onSubmit={handleSubmit}>
          <div>
            <CommuteSelector
              label='Commute Method:'
              setCommuteMethod={setCommute}
              id='commuteMethodInput'
              isRequired={true}
            />
            <FormField
              id='commuteDistInput'
              type='number'
              placeholder='Distance (km)'
              label='Commute Distance:'
              isRequired={true}
              onChange={(event) =>
                setCommuteDistance(parseFloat(event.target.value))
              }
            />
            <FormField
              id='clientNameInput'
              type='text'
              placeholder='Display Name'
              label='Display Name:'
              isRequired={true}
              onChange={(event) => setClient(event.target.value)}
            />
            <FormField
              id='petNamesInput'
              type='text'
              placeholder='Pet Name(s)'
              label='Pet name(s):'
              isRequired={true}
              onChange={(event) => setPetNames(event.target.value)}
            />
            <FormField
              id='visitTypeInput'
              type='select'
              placeholder='Select...'
              label='Visit Type:'
              selectOptions={visitSelectOptions}
              isRequired={true}
              onChange={(event) => setType(event.target.value)}
            />
          </div>
          {type == 'Walk' && (
            <FormField
              id='walkDistInput'
              type='number'
              placeholder='Distance (km)'
              label='Walk Distance:'
              isRequired={true}
              onChange={(event) =>
                setWalkDistance(parseFloat(event.target.value))
              }
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
