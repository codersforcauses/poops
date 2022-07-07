import React from 'react'
import { useState } from 'react'

import { User, writeUserData } from '@/../databaseIntigration'
import FormField from '@/components/visit/formField'

interface ModalViewProps {
  openFunc: () => void
}

const ModalView: React.FC<ModalViewProps> = ({ openFunc }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [petName, setPetName] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [duration, setDuration] = useState('')
  const [walkDist, setWalkDist] = useState('')
  const [commuteDist, setCommuteDist] = useState('')
  const [commuteMethod, setCommuteMethod] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <div className='fixed inset-0 z-50 h-screen w-screen rounded-sm bg-white p-4 shadow '>
      <div className=''>
        <button onClick={openFunc}> X </button>
        <div className=''>
          <h1> Add Your Visit</h1>
        </div>
        <form
          className=''
          onSubmit={(event) => {
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
            event.preventDefault()
          }}
        >
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
                    placeholder='Distance (metres)'
                    label='Walk Distance:'
                    isRequired={true}
                    onChange={(event) => setWalkDist(event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormField
                    id='commuteDistInput'
                    type='number'
                    placeholder='Distance (metres)'
                    label='Commute Distance:'
                    isRequired={true}
                    onChange={(event) => setCommuteDist(event.target.value)}
                  />
                </td>
                <td>
                  <FormField
                    id='commuteMethodInput'
                    type='text'
                    placeholder='Commute Method'
                    label='Commute Method:'
                    isRequired={true}
                    onChange={(event) => setCommuteMethod(event.target.value)}
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
          <button
            type='submit'
            // onClick={() =>
            //   setTimeout(() => {
            //     window.location.reload()
            //   }, 500)
            // }
          >
            Submit
          </button>
        </form>
        <div className=''>
          <button onClick={openFunc} className=''>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalView
