import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { XIcon } from '@heroicons/react/outline'
import { Timestamp } from 'firebase/firestore'

import { withProtected } from '@/components/PrivateRoute'
import CommuteSelector from '@/components/Visit/commuteselector'
import FormField from '@/components/Visit/formfield'
import { formatTimestamp } from '@/components/Visit/utils'
import { visitSelectOptions } from '@/components/Visit/visitlist'
import { useFirestore } from '@/context/firestore'
import { VisitData } from '@/types/types'

const Visit = () => {
  // BUG: when reloading this page whilst editing, all the fields are removed. userDoc is undefined?
  const { userDoc, updateVisit } = useFirestore()
  const router = useRouter()
  const i: string | string[] | undefined = router.query.id
  let id: number | null = null
  let visit: VisitData | null = null
  if (i) {
    id = parseInt(i + '')
    visit = userDoc.visits[id - 1]
  }

  const [visitType, setVisitType] = useState(visit?.type || '')
  const [clientName, setClientName] = useState(visit?.clientId || '')
  const [petNames, setPetNames] = useState('')
  const [startTime, setStartTime] = useState(
    formatTimestamp(visit?.startTime) || ''
  )
  const [endTime, setEndTime] = useState(formatTimestamp(visit?.endTime) || '')
  const [walkDist, setWalkDist] = useState(visit?.walkDist || NaN)
  const [pets, setpets] = useState('')
  const [commuteDist, setCommuteDist] = useState(visit?.commuteDist || NaN)
  const [commuteMethod, setCommuteMethod] = useState(visit?.commuteMethod || '')
  const [notes, setNotes] = useState(visit?.notes || '')

  const handleSubmit = (click: React.FormEvent<HTMLFormElement>) => {
    click.preventDefault()

    const data: VisitData = {
      type: visitType,
      clientId: clientName,
      startTime: Timestamp.fromDate(new Date(startTime)),
      endTime: Timestamp.fromDate(new Date(endTime)),
      pets: pets,
      walkDist: walkDist,
      commuteDist: commuteDist,
      commuteMethod: commuteMethod,
      notes: notes,
      inProgress: false
    }
    // when id = 0, since 0 is falsey, it creates a new visit. seems to work for others
    // TODO: stop using indexes and use actual ids?
    setpets('') //let me push
    // tee hee i worked round it
    if (id) {
      userDoc.visits[id - 1] = data // added 1 when sending to pass check
    } else {
      userDoc.visits.push(data)
    }
    updateVisit?.(userDoc)
    router.push('/visit')
  }

  const isSubmitEnabled = () =>
    visitType &&
    clientName &&
    petNames &&
    startTime &&
    endTime &&
    walkDist >= 0 &&
    commuteDist >= 0 &&
    commuteMethod

  return (
    <div className='z-50 p-4'>
      <>
        <div className='fixed right-5 top-4 z-[100] h-10 w-10 rounded-full bg-primary p-1 drop-shadow-default'>
          <Link href='/visit'>
            <button>
              <XIcon className='h-full w-full text-white' />
            </button>
          </Link>
        </div>

        <div className='border-b-2 border-primary py-3 pt-10'>
          <h1 className='pl-2 text-2xl font-bold'>
            {id ? 'Edit' : 'Add'} Your Visit
          </h1>
        </div>

        <form className='pt-3' onSubmit={handleSubmit}>
          <table className='container mx-auto table-fixed'>
            <tbody>
              <tr>
                <td>
                  {/* could rewrite to use awful react-select to make chevron icon consistent */}
                  <FormField
                    id='visitTypeInput'
                    type='select'
                    placeholder='Select...'
                    value={visitType}
                    label='Visit Type:'
                    selectOptions={visitSelectOptions}
                    isRequired={true}
                    onChange={(event) => setVisitType(event.target.value)}
                  />
                </td>
                <td>
                  <FormField
                    id='clientName'
                    type='text'
                    placeholder='Client Name'
                    value={clientName}
                    label='Client Name:'
                    isRequired={true}
                    onChange={(event) => setClientName(event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormField
                    id='petNamesInput'
                    type='text'
                    placeholder='Pet Name(s)'
                    value={petNames}
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
                    value={walkDist.toString()}
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
                    value={commuteDist.toString()}
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
            id='startTimeInput'
            type='dateTime-local'
            placeholder='Start Time'
            value={startTime}
            label='Start Time:'
            isRequired={true}
            onChange={(event) => setStartTime(event.target.value)}
          />
          <FormField
            id='endTimeInput'
            type='dateTime-local'
            placeholder='End Time'
            value={endTime}
            label='End Time:'
            isRequired={true}
            onChange={(event) => setEndTime(event.target.value)}
          />
          <FormField
            id='notesInput'
            type='textarea'
            placeholder='Add notes here'
            value={notes}
            label='Notes:'
            isRequired={false}
            onChange={(event) => setNotes(event.target.value)}
          />
          <div className='mx-auto my-2 flex flex-col p-1 '>
            <button
              className={`text-bold rounded px-12 py-4 text-white drop-shadow-default ${
                isSubmitEnabled()
                  ? 'bg-primary active:bg-dark-red'
                  : 'bg-dark-gray'
              }`}
              disabled={!isSubmitEnabled()}
              type='submit'
            >
              Submit
            </button>
            <Link href='/visit'>
              <button
                type='button'
                className='text-bold mt-2 rounded bg-primary p-1 text-white drop-shadow-default active:bg-dark-red'
                onClick={() => {
                  userDoc.visits.splice(Number(id), 1)
                  updateVisit?.(userDoc)
                }}
                hidden={false} // button should be hidden if no id
              >
                Remove
              </button>
            </Link>
          </div>
        </form>
      </>
    </div>
  )
}

export default withProtected(Visit)