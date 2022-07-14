import React, { useState } from 'react'

import {
  deletUserData,
  updateUserData,
  User,
  Visit
} from '@/components/Firebase/init'

function NumberForm(value: string) {
  if (isNaN(parseFloat(value))) {
    return 0
  }
  return parseFloat(value)
}

const EditableVisitInstance = (props: Visit) => {
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [dateTime, setDateTime] = useState(props.dateTime)
  const [petNames, setpetNames] = useState(props.petNames)
  const [walkDist, setWalkDist] = useState(props.walkDist)
  const [duration, setDuration] = useState(props.duration)
  const [commuteDist, setCommuteDist] = useState(props.commuteDist)
  const [commuteMethod, setCommuteMethod] = useState(props.commuteMethod)
  const [notes, setNotes] = useState(props.notes)

  return (
    <form
      onSubmit={(event) => {
        const userData: User = {
          firstName: firstName,
          lastName: lastName,
          petNames: petNames,
          dateTime: dateTime,
          duration: duration,
          walkDist: walkDist,
          commuteDist: commuteDist,
          commuteMethod: commuteMethod,
          notes: notes
        }
        updateUserData(props.id, userData)
        event.preventDefault()
      }}
    >
      <div className='font-bold peer-checked:font-normal'>
        <input
          placeholder='Date'
          value={dateTime}
          onChange={(event) => setDateTime(event.target.value)}
          className='bg-gray font-normal text-primary'
        />
        <div>
          <input
            size={8}
            className='bg-gray text-sm font-normal text-primary'
            placeholder='Last Name'
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <input
            size={8}
            className='bg-gray text-sm font-normal text-primary'
            placeholder='First Name'
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
      </div>
      <p className='text-sm'>
        Pet/Pets:{' '}
        <input
          size={8}
          className='bg-gray text-primary'
          placeholder='Pet Name(s)'
          value={petNames}
          onChange={(event) => setpetNames(event.target.value)}
        />
      </p>
      <p className='text-sm'>
        Duration:{' '}
        <input
          size={8}
          className='bg-gray text-primary'
          placeholder='Duration'
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
        />
      </p>
      <p className='text-sm'>
        Walk Metres:{' '}
        <input
          size={8}
          className='bg-gray p-0 text-sm text-primary'
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
          className='bg-gray text-primary'
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
          className='bg-gray text-primary'
          placeholder='Method'
          value={commuteMethod}
          onChange={(event) => setCommuteMethod(event.target.value)}
        />
      </p>
      <p className='text-sm'>
        Notes:{' '}
        <input // maybe use textarea tag instead?
          size={24}
          className='bg-gray text-primary'
          placeholder='Notes'
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </p>
      <button
        type='submit'
        className='text-bold mt-2 rounded-xl bg-primary p-2 text-white drop-shadow-default active:bg-dark-red'
        onClick={() =>
          setTimeout(() => {
            window.location.reload()
          }, 125)
        }
      >
        Submit
      </button>
      <button
        type='button'
        className='text-bold mt-2 ml-4 rounded-xl bg-primary p-1 text-white drop-shadow-default active:bg-dark-red'
        onClick={() => {
          deletUserData(props.id)
          //   setTimeout(() => {
          //     window.location.reload()
          //   }, 125)
        }}
      >
        Remove
      </button>
    </form>
  )
}

export default EditableVisitInstance
