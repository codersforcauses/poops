import { FormEvent, useState } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { Timestamp } from 'firebase/firestore'

import { visitSelectOptions } from '@/components/Visit/visitlist'
import { useFirestore } from '@/context/Firebase/Firestore/context'
import { VisitData } from '@/types/types'

import CommuteSelector from './commuteselector'
import FormField from './formfield'

interface ModalViewProps {
  toggleModal: () => void
}

const ModalView = ({ toggleModal }: ModalViewProps) => {
  const { userDoc, updateVisit } = useFirestore()
  const [visitType, setVisitType] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [petNames, setPetNames] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [walkDist, setWalkDist] = useState(NaN)
  const [commuteDist, setCommuteDist] = useState(NaN)
  const [commuteMethod, setCommuteMethod] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (click: FormEvent<HTMLFormElement>) => {
    click.preventDefault()
    const data: VisitData = {
      type: visitType,
      displayName: displayName,
      petNames: petNames,
      startTime: Timestamp.fromDate(new Date(startTime)),
      endTime: Timestamp.fromDate(new Date(endTime)),
      walkDist: walkDist,
      commuteDist: commuteDist,
      commuteMethod: commuteMethod,
      notes: notes
    }
    userDoc.visits.push(data)
    updateVisit?.(userDoc)
    toggleModal()
  }

  const isSubmitEnabled = () => {
    return (
      visitType &&
      displayName &&
      petNames &&
      startTime &&
      endTime &&
      walkDist >= 0 &&
      commuteDist >= 0 &&
      commuteMethod
    )
  }

  return (
    <div className='z-50 p-4'>
      <>
        <div className='fixed right-5 top-4 z-[100] h-10 w-10 rounded-full bg-primary p-1 drop-shadow-default'>
          <button onClick={toggleModal}>
            <XIcon className='h-full w-full text-white' />
          </button>
        </div>

        <div className='border-b-2 border-primary py-3 pt-10'>
          <h1 className='pl-2 text-2xl font-bold'>Add Your Visit</h1>
        </div>

        <form className='pt-3' onSubmit={handleSubmit}>
          <table className='container mx-auto table-fixed'>
            <tbody>
              <tr>
                <td>
                  <FormField
                    id='visitTypeInput'
                    type='select'
                    placeholder='Select...'
                    label='Visit Type:'
                    selectOptions={visitSelectOptions}
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
                    id='petNamesInput'
                    type='text'
                    placeholder='Pet Name(s)'
                    label='Pet name(s):'
                    isRequired={true}
                    onChange={(event) => setPetNames(event.target.value)}
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
                  {/* react-select does not support required prop for Select components */}
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
            id='startTimeInput'
            type='dateTime-local'
            placeholder='Start Time'
            label='Start Time:'
            isRequired={true}
            onChange={(event) => setStartTime(event.target.value)}
          />
          <FormField
            id='endTimeInput'
            type='dateTime-local'
            placeholder='End Time'
            label='End Time:'
            isRequired={true}
            onChange={(event) => setEndTime(event.target.value)}
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
              className='text-bold rounded bg-primary px-12 py-4 text-white drop-shadow-default active:bg-dark-red disabled:bg-dark-gray'
              disabled={!isSubmitEnabled()}
              type='submit'
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
