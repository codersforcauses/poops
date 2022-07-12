import React from 'react'
import { useState } from 'react'
import { User, writeUserData } from 'databaseintegration'

import { CancelSymbol } from './buttons'
import CommuteSelector from './commuteselector'
import FormField from './formfield'

interface ModalViewProps {
  openFunc: () => void
}

const ModalView: React.FC<ModalViewProps> = ({ openFunc }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [petName, setPetName] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [duration, setDuration] = useState('')
  const [walkDist, setWalkDist] = useState(0)
  const [commuteDist, setCommuteDist] = useState(0)
  const [commuteMethod, setCommuteMethod] = useState('')
  const [notes, setNotes] = useState('')

  const onSubmit = () => {
    const data: User = {
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
    writeUserData(data)
  }

  const isSubmitDisabled = () =>
    firstName &&
    lastName &&
    petName &&
    dateTime &&
    duration &&
    walkDist &&
    commuteDist &&
    commuteMethod

  return (
    <div className='fixed inset-0 z-50 h-screen w-screen rounded-sm bg-white p-4 shadow '>
      <div>
        <div className='fixed right-2 top-2 h-7 w-7 rounded-full bg-primary'>
          <button onClick={openFunc}>
            <CancelSymbol />
          </button>
        </div>

        <h1 className='mx-1 border-b-2 border-primary py-3 pt-10 text-2xl font-bold'>
          Add Your Visit
        </h1>
        <form className='pt-3' onSubmit={() => onSubmit}>
          <table className='container mx-auto table-fixed'>
            <tbody>
              <tr>
                <td>
                  <FormField
                    id='firstNameInput'
                    type='text'
                    placeholder='First Name'
                    label='First Name:'
                    isRequired={true}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </td>
                <td>
                  <FormField
                    id='lastNameInput'
                    type='text'
                    placeholder='Last Name'
                    label='Last Name:'
                    isRequired={true}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormField
                    id='petNameInput'
                    type='text'
                    placeholder='Pet Name'
                    label='Pet name:'
                    isRequired={true}
                    onChange={(event) => setPetName(event.target.value)}
                  />
                </td>
                <td>
                  <FormField
                    id='walkDistInput'
                    type='number'
                    placeholder='Distance (km)'
                    label='Walk Distance:'
                    isRequired={true}
                    onChange={(event) =>
                      setWalkDist(parseFloat(event.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormField
                    id='commuteDistInput'
                    type='number'
                    placeholder='Distance (km)'
                    label='Commute Distance:'
                    isRequired={true}
                    onChange={(event) =>
                      setCommuteDist(parseFloat(event.target.value))
                    }
                  />
                </td>
                <td>
                  {/* no validation? */}
                  <CommuteSelector
                    label='Commute Method:'
                    setCommuteMethod={setCommuteMethod}
                    id='commuteMethodInput'
                    isRequired={true}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <FormField
            id='dateTimeInput'
            type='datetime-local'
            placeholder='Date'
            label='Date:'
            isRequired={true}
            onChange={(event) => setDateTime(event.target.value)}
          />
          <FormField
            id='durationInput'
            type='time'
            placeholder='Duration'
            label='Duration:'
            isRequired={true}
            onChange={(event) => setDuration(event.target.value)}
          />
          <FormField
            id='notesInput'
            type='textarea'
            placeholder='Add notes here'
            label='Notes:'
            isRequired={false}
            onChange={(event) => setNotes(event.target.value)}
          />
          <div className='mx-auto my-2 flex flex-col p-1 '>
            <button
              className='text-bold rounded bg-primary px-12 py-4 text-white drop-shadow-default active:bg-dark-red'
              disabled={!isSubmitDisabled}
            >
              Submit
            </button>
          </div>
        </form>
        <div className=''></div>
      </div>
    </div>
  )
}

export default ModalView
