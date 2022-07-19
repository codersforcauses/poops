import React, { Dispatch, useState } from 'react'

import {
  formatDuration,
  VisitInstanceProps
} from '@/components/Visit/visitinstance'
import { useFirestore } from '@/context/firestore'
import { VisitData } from '@/types/types'

interface EditVisitInstanceProps extends VisitInstanceProps {
  isEdit: Dispatch<React.SetStateAction<boolean>>
}

function NumberForm(value: string) {
  if (isNaN(parseFloat(value))) {
    return 0
  }
  return parseFloat(value)
}

const EditableVisitInstance = (props: EditVisitInstanceProps) => {
  const { userDoc, updateVisit } = useFirestore()
  const [visitType, setVisitType] = useState(props.type)
  const [displayName, setDisplayName] = useState(props.displayName)
  const [petNames, setpetNames] = useState(props.petNames)
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
          displayName: displayName,
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
        event.preventDefault()
        props.isEdit(false)
      }}
    >
      <div className='font-bold peer-checked:font-normal'>
        <input
          placeholder='Start Time'
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
          className='bg-cream font-normal text-primary'
        />
        <div>
          <input
            size={16}
            className='bg-cream text-sm font-normal text-primary'
            placeholder='Display Name'
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </div>
      </div>
      <p className='text-sm'>
        Visit Type:{' '}
        <input
          size={8}
          className='bg-cream text-primary'
          placeholder='Type'
          value={visitType}
          onChange={(event) => setVisitType(event.target.value)} // TODO make this more friendly input
        />
      </p>{' '}
      <p className='text-sm'>
        Pet/Pets:{' '}
        <input
          size={16}
          className='bg-cream text-primary'
          placeholder='Pet Name(s)'
          value={petNames}
          onChange={(event) => setpetNames(event.target.value.split(', '))} // TODO make this more friendly input
        />
      </p>
      <p className='text-sm font-bold'>
        For multiple pets, please seperate with &quot;, &quot;
      </p>
      <p className='text-sm'>
        End Time:{' '}
        <input
          type='datetime-local'
          size={8}
          className='bg-cream text-primary'
          placeholder='End Time'
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
      </p>
      <p className='text-sm'>Duration: {formatDuration(props)}</p>
      <p className='text-sm'>
        Walk Metres:{' '}
        <input
          size={8}
          className='bg-cream p-0 text-sm text-primary'
          type='number'
          step='0.001'
          placeholder='Distance'
          value={walkDist.toString()}
          onChange={(event) => {
            setWalkDist(NumberForm(event.target.value))
          }}
        />
      </p>
      <p className='text-sm'>
        Commute Metres:{' '}
        <input
          size={8}
          className='bg-cream text-primary'
          type='number'
          step='0.001'
          placeholder='Distance'
          value={commuteDist.toString()}
          onChange={(event) => {
            setCommuteDist(NumberForm(event.target.value))
          }}
        />
      </p>
      <p className='text-sm'>
        Commute Method:{' '}
        <input
          size={8}
          className='bg-cream text-primary'
          placeholder='Method'
          value={commuteMethod}
          onChange={(event) => setCommuteMethod(event.target.value)}
        />
      </p>
      <p className='text-sm'>
        Notes:{' '}
        <input // maybe use textarea tag instead?
          size={24}
          className='bg-cream text-primary'
          placeholder='Notes'
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </p>
      <button
        type='submit'
        className='text-bold mt-2 rounded-xl bg-primary p-2 text-white drop-shadow-default active:bg-dark-red'
      >
        Submit
      </button>
      <button
        type='button'
        className='text-bold mt-2 ml-4 rounded-xl bg-primary p-1 text-white drop-shadow-default active:bg-dark-red'
        onClick={() => {
          userDoc.visits.splice(props.id, 1)
          const temp: VisitData[] = [...userDoc.visits] //temp needed for react to rerender
          props.set(temp)
          updateVisit?.(userDoc)
        }}
      >
        Remove
      </button>
    </form>
  )
}

export default EditableVisitInstance
