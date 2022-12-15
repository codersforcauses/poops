import { Dispatch, SetStateAction, useState } from 'react'
import { Timestamp } from 'firebase/firestore'

import { getCommuteMethods } from '@/components/Visit/commuteselector'
import {
  formatDuration,
  VisitInstanceProps
} from '@/components/Visit/visitinstance'
import { useFirestore } from '@/context/Firebase/Firestore/context'
import { VisitData } from '@/types/types'

import { visitSelectOptions } from './visitlist'
import Button from '../UI/button'

interface EditVisitInstanceProps extends VisitInstanceProps {
  isEditable: Dispatch<SetStateAction<boolean>>
}

const formatNumber = (value: string) => {
  if (isNaN(parseFloat(value))) {
    return 0
  }
  return parseFloat(value)
}

const padNumber = (value: number) => {
  return value.toString().padStart(2, '0')
}

// YYYY-MM-DDTHH:mm
const formatDate = (timestamp: Timestamp) => {
  const date = timestamp.toDate()
  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(
    date.getDate()
  )}T${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`
}

const EditableVisitInstance = (props: EditVisitInstanceProps) => {
  const { userDoc, updateVisit } = useFirestore()
  const [visitType, setVisitType] = useState(props.type)
  const [clientName, setClientName] = useState(props.clientName)
  const [petNames, setPetNames] = useState(props.petNames)
  const [startTime, setStartTime] = useState(props.startTime)
  const [endTime, setEndTime] = useState(props.endTime)
  const [walkDist, setWalkDist] = useState(props.walkDist)
  const [commuteDist, setCommuteDist] = useState(props.commuteDist)
  const [commuteMethod, setCommuteMethod] = useState(props.commuteMethod)
  const [notes, setNotes] = useState(props.notes)

  return (
    <form
      onSubmit={(event) => {
        const visit: VisitData = {
          type: visitType,
          clientName: clientName,
          petNames: petNames,
          startTime: startTime,
          endTime: endTime,
          walkDist: walkDist,
          commuteDist: commuteDist,
          commuteMethod: commuteMethod,
          notes: notes
        }
        userDoc.visits[props.id] = visit
        const temp: VisitData[] = [...userDoc.visits] //temp needed for react to rerender
        props.set(temp)
        updateVisit?.(userDoc)
        props.isEditable(false)
        event.preventDefault()
      }}
    >
      <div className='font-bold peer-checked:font-normal'>
        <div>
          <input
            placeholder='Start Time'
            type='datetime-local'
            value={formatDate(startTime)}
            onChange={(event) =>
              setStartTime(Timestamp.fromDate(new Date(event.target.value)))
            }
            className='bg-gray-50 font-normal text-primary'
            required
          />
        </div>
        <div>
          <input
            className='bg-cream text-sm font-normal text-primary'
            placeholder='Display Name'
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            required
          />
        </div>
      </div>
      <div className='text-sm'>
        <div>
          Visit Type:{' '}
          <select
            className='bg-cream text-primary'
            onChange={(event) => setVisitType(event.target.value)}
            value={visitType}
            required
          >
            <option value=''>Select...</option>
            {visitSelectOptions.map((o, i) => (
              <option key={i} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          Pet/Pets:{' '}
          <input
            className='bg-cream text-primary'
            placeholder='Pet Name(s)'
            value={petNames}
            onChange={(event) => setPetNames(event.target.value)}
            required
          />
        </div>
        <div>
          End Time:{' '}
          <input
            type='datetime-local'
            className='bg-cream text-primary'
            placeholder='End Time'
            value={formatDate(endTime)}
            onChange={(event) =>
              setEndTime(Timestamp.fromDate(new Date(event.target.value)))
            }
            required
          />
        </div>
        <div>Duration: {formatDuration(props.startTime, props.endTime)}</div>
        <div>
          Walk Distance:{' '}
          <input
            className='bg-cream text-primary'
            type='number'
            step='0.001'
            min='0'
            placeholder='Distance'
            value={walkDist.toString()}
            onChange={(event) => {
              setWalkDist(formatNumber(event.target.value))
            }}
            required
          />
        </div>
        <div>
          Commute Distance:{' '}
          <input
            className='bg-cream text-primary'
            type='number'
            step='0.001'
            min='0'
            placeholder='Distance'
            value={commuteDist.toString()}
            onChange={(event) => {
              setCommuteDist(formatNumber(event.target.value))
            }}
            required
          />
        </div>
        <div>
          Commute Method:{' '}
          <select
            className='bg-cream text-primary'
            onChange={(event) => setCommuteMethod(event.target.value)}
            value={commuteMethod}
            required
          >
            <option value=''>Select...</option>
            {getCommuteMethods().map((o, i) => (
              <option key={i} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          Notes:
          <br />
          <textarea
            className='bg-cream w-full text-primary'
            placeholder='Add notes here'
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
      </div>

      <div className='flex justify-center gap-2'>
        <Button size='medium' type='submit'>
          Submit
        </Button>
        <Button
          size='medium'
          onClick={() => {
            userDoc.visits.splice(props.id, 1)
            const temp: VisitData[] = [...userDoc.visits] //temp needed for react to rerender
            props.set(temp)
            updateVisit?.(userDoc)
          }}
        >
          Remove
        </Button>
      </div>
    </form>
  )
}

export default EditableVisitInstance
