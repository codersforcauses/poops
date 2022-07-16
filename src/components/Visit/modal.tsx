import React from 'react'
import { useState } from 'react'
import { XIcon } from '@heroicons/react/solid'

import CommuteSelector from './commuteselector'
import FormField from './formfield'

interface ModalViewProps {
  toggleModal: () => void
}

const ModalView = ({ toggleModal }: ModalViewProps) => {
  const [visitType, setVisitType] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [petName, setPetName] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [duration, setDuration] = useState('')
  const [walkDist, setWalkDist] = useState(0)
  const [commuteDist, setCommuteDist] = useState(0)
  const [commuteMethod, setCommuteMethod] = useState('')
  /* eslint-disable unused-imports/no-unused-vars */
  const [notes, setNotes] = useState('')

  const isSubmitEnabled = () =>
    visitType &&
    displayName &&
    petName &&
    dateTime &&
    duration &&
    walkDist &&
    commuteDist &&
    commuteMethod

  const handleSubmit = () => {
    // TODO: Make API call
  }

  return (
    <div className='z-50 p-4'>
      <>
        <div className='fixed right-5 top-4 h-10 w-10 rounded-full bg-primary p-1 drop-shadow-default'>
          <button onClick={toggleModal}>
            <XIcon className='h-full w-full text-white' />
          </button>
        </div>

        <h1 className='mx-1 border-b-2 border-primary py-3 pt-10 text-2xl font-bold'>
          Add Your Visit
        </h1>
        <form className='pt-3' onSubmit={handleSubmit}>
          <table className='container mx-auto table-fixed'>
            <tbody>
              <tr>
                <td>
                  {/* could rewrite to use awful react-select to make chevron icon consistent */}
                  <FormField
                    id='visitTypeInput'
                    type='select'
                    placeholder='Visit Type'
                    label='Visit Type:'
                    isRequired={true}
                    onChange={(event) => setVisitType(event.target.value)}
                  />
                </td>
                <td>
                  <FormField
                    id='displayNameInput'
                    type='text'
                    placeholder='Display Name'
                    label='Display Name:'
                    isRequired={true}
                    onChange={(event) => setDisplayName(event.target.value)}
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
              type='submit'
              disabled={!isSubmitEnabled}
            >
              Submit
            </button>
          </div>
        </form>
      </>
    </div>
  )
}

export default ModalView
