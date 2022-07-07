import React from 'react'
import { useState } from 'react'

import { writeUserData } from '@/../databaseIntigration'
import FormField from '@/components/visit/formField'

interface ModalViewProps {
  openFunc: () => void
}

const ModalView: React.FC<ModalViewProps> = ({ openFunc }) => {
  const [fName, setFirstName] = useState('')
  const [lName, setLastName] = useState('')
  const [pName, setPetName] = useState('')
  const [date, setDate] = useState('')
  const [dist, setDistance] = useState('')

  return (
    <div className='fixed inset-0 z-50 h-screen w-screen rounded-sm bg-white py-10 px-10 shadow '>
      <div className=''>
        <button onClick={openFunc}> X </button>
        <div className=''>
          <h1> Add Your Visit</h1>
        </div>
        <form
          className=''
          onSubmit={(event) => {
            const data = {
              fName: fName,
              lName: lName,
              pName: pName,
              date: date,
              dist: dist
            }
            writeUserData(
              data.fName,
              data.lName,
              data.pName,
              data.date,
              data.dist
            )
            event.preventDefault()
          }}
        >
          <table>
            <tr>
              <FormField
                id='fNameInput'
                type='text'
                placeholder='First Name'
                label='First Name:'
                isRequired={true}
                onChange={(event) => setFirstName(event.target.value)}
              />
              <FormField
                id='lNameInput'
                type='text'
                placeholder='Last Name'
                label='Last Name:'
                isRequired={true}
                onChange={(event) => setLastName(event.target.value)}
              />
            </tr>

            <FormField
              id='pNameInput'
              type='text'
              placeholder='Pet Name'
              label='Pet Name:'
              isRequired={true}
              onChange={(event) => setPetName(event.target.value)}
            />
            <FormField
              id='dateInput'
              type='date'
              placeholder='Date'
              label='Date:'
              isRequired={true}
              onChange={(event) => setDate(event.target.value)}
            />
            <FormField
              id='distInput'
              type='number'
              placeholder='Distance (km)'
              label='Distance:'
              isRequired={true}
              onChange={(event) => setDistance(event.target.value)}
            />
            <button
              type='submit'
              onClick={() =>
                setTimeout(() => {
                  window.location.reload()
                }, 500)
              }
            >
              Submit
            </button>
          </table>
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
