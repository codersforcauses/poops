import React, { useState } from 'react'
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'
import { updateUserData, User, Visit } from 'databaseIntigration'

import EditButton from '@/components/visit/Buttons'

type VisitInstanceProps = Visit

function NumberForm(value: string) {
  if (isNaN(parseFloat(value))) {
    return 0
  }
  return parseFloat(value)
}

function ReadOnlyVisitInstance(props: User) {
  return (
    <>
      <div className='font-bold peer-checked:font-normal'>
        <p className='font-bold text-primary'>{`${props.dateTime}`}</p>
        <p className='text-sm'>{`${props.lastName}, ${props.firstName}`}</p>
      </div>
      <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-40'>
        <p>Pet/Pets: {props.petName}</p>
        <p>Duration: {props.duration}</p>
        <p>Walk Metres: {props.walkDist.toFixed(3)} km</p>
        <p>Commute Metres: {props.commuteDist.toFixed(1)} km</p>
        <p>Commute Method: {props.commuteMethod}</p>
        <p>Notes: {props.notes}</p>
      </div>
    </>
  )
}

function EditableVisitInstance(props: Visit) {
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [dateTime, setDateTime] = useState(props.dateTime)
  const [petName, setPetName] = useState(props.petName)
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
          petName: petName,
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
          value={petName}
          onChange={(event) => setPetName(event.target.value)}
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
          size={8}
          className='bg-gray text-primary'
          placeholder='Notes'
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </p>
      <button
        type='submit'
        className='text-bold mt-2 rounded-xl bg-primary p-2 text-white drop-shadow-default'
        onClick={() =>
          setTimeout(() => {
            window.location.reload()
          }, 500)
        }
      >
        Submit
      </button>
    </form>
  )
}

export default function VisitInstance(props: VisitInstanceProps) {
  const [isEditable, setIsEditable] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      key={props.id}
      className='m-2 flex flex-col space-y-1 rounded-xl bg-gray p-2 drop-shadow-default'
    >
      <div className='flex justify-between'>
        <div className='relative w-full'>
          <input
            type='checkbox'
            checked={isOpen}
            readOnly={true}
            className='peer absolute h-0 w-0 cursor-pointer opacity-0'
          />

          <ChevronDownIcon
            className='absolute top-3 right-5 h-6 w-6 cursor-pointer text-primary transition-transform duration-500 peer-checked:rotate-180'
            onClick={() => {
              setIsOpen(!isOpen)
              setIsEditable(false)
            }}
          />
          {isEditable ? (
            <EditableVisitInstance
              key={props.id}
              id={props.id}
              firstName={props.firstName}
              lastName={props.lastName}
              petName={props.petName}
              duration={props.duration}
              dateTime={props.dateTime}
              walkDist={props.walkDist}
              commuteDist={props.commuteDist}
              commuteMethod={props.commuteMethod}
              notes={props.notes}
            />
          ) : (
            <ReadOnlyVisitInstance
              key={props.id}
              firstName={props.firstName}
              lastName={props.lastName}
              petName={props.petName}
              duration={props.duration}
              dateTime={props.dateTime}
              walkDist={props.walkDist}
              commuteDist={props.commuteDist}
              commuteMethod={props.commuteMethod}
              notes={props.notes}
            />
          )}

          {/* Edit button */}
          <div className='invisible absolute right-4 bottom-1 h-7 w-7 rounded-full bg-primary text-primary drop-shadow-default transition-all peer-checked:visible'>
            <button
              type='button'
              onClick={() => {
                setIsEditable(!isEditable)
              }}
            >
              <EditButton isEdit={isEditable} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
