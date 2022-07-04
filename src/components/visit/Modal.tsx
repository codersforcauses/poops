import React from 'react'
import { useState } from 'react'

import { writeUserData } from '../../../databaseIntigration'

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
    <div className='fixed inset-0 bg-black bg-opacity-25 '>
      <div className='flex-initial rounded-sm bg-white py-10 px-10 shadow '>
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
            <input
              placeholder='first Name'
              onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              placeholder='last Name'
              id='LNameInput'
              onChange={(event) => setLastName(event.target.value)}
            />
            <input
              placeholder='Pet Name'
              id='petNameInput'
              onChange={(event) => setPetName(event.target.value)}
            />
            <input
              placeholder='Date'
              type='date'
              id='DateInput'
              onChange={(event) => setDate(event.target.value)}
            />
            <input
              placeholder='distance'
              id='distanceInput'
              onChange={(event) => setDistance(event.target.value)}
            />
            <button
              type='submit'
              onClick={() =>
                setTimeout(function () {
                  window.location.reload()
                }, 500)
              }
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
    </div>
  )
}

export default ModalView
