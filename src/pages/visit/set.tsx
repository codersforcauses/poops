import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { XIcon } from '@heroicons/react/outline'
import { Timestamp } from 'firebase/firestore'

import { withProtected } from '@/components/PrivateRoute'
import { ReportButton, VetConcernButton } from '@/components/Visit/buttons'
import ClientSelector from '@/components/Visit/clientselector'
import CommuteSelector from '@/components/Visit/commuteselector'
import DurationSelector from '@/components/Visit/durationselector'
import FormField from '@/components/Visit/formfield'
import { formatTimestamp, visitSelectOptions } from '@/components/Visit/utils'
import { findContactIndex } from '@/components/Visit/utils'
import { useFirestore } from '@/context/firestore'
import { Duration, VisitData } from '@/types/types'

const Visit = () => {
  // BUG: when reloading this page whilst editing, all the fields are removed. userDoc is undefined?
  const { userDoc, updateVisit } = useFirestore()
  const router = useRouter()
  const i: string | string[] | undefined = router.query.id
  let id: number | null = null
  let visit: VisitData | null = null
  if (i !== undefined) {
    id = parseInt(i + '')
    visit = userDoc.visits[id]
  }

  const [visitType, setVisitType] = useState(visit?.type || '')
  const [{ clientId, clientName }, setClient] = useState({
    clientId: visit?.clientId || '',
    clientName: visit?.clientName || ''
  })
  const [startTime, setStartTime] = useState(
    formatTimestamp(visit?.startTime) || ''
  )
  const [duration, setDuration] = useState<Duration>({
    hours: visit?.duration.hours || 0,
    minutes: visit?.duration.minutes || 0
  })
  const [walkDist, setWalkDist] = useState(visit?.walkDist || NaN)
  const [commuteDist, setCommuteDist] = useState(visit?.commuteDist || NaN)
  const [commuteMethod, setCommuteMethod] = useState(visit?.commuteMethod || '')
  const [notes, setNotes] = useState(visit?.notes || '')

  const handleSubmit = (click: React.FormEvent<HTMLFormElement>) => {
    click.preventDefault()

    const data: VisitData = {
      type: visitType,
      clientId: clientId, // possible refac: push a client object
      clientName: clientName,
      startTime: Timestamp.fromDate(new Date(startTime)),
      duration: duration,
      petNames: userDoc.contacts[findContactIndex(clientName, userDoc)].pets, // TODO?: find contact by id instead
      walkDist: walkDist,
      commuteDist: commuteDist,
      commuteMethod: commuteMethod,
      notes: notes
    }
    if (id !== null) {
      userDoc.visits[id] = data
    } else {
      userDoc.visits.push(data)
    }
    updateVisit?.(userDoc)
    router.push('/visit')
    // TODO: add alert?
  }

  const isSubmitEnabled = () =>
    visitType &&
    clientId &&
    startTime &&
    duration.hours >= 0 &&
    duration.minutes >= 0
  walkDist >= 0 && commuteDist >= 0 && commuteMethod

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
            {id !== null ? 'Edit' : 'Add'} Your Visit
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
                  <ClientSelector
                    id='clientNameInput'
                    type='text'
                    placeholder='Client Name'
                    value={clientName}
                    label='Client Name:'
                    isRequired={true}
                    setClient={setClient}
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
                  {/* react-select components have no native form validation but what we can do is disable the submit button if the input is empty */}
                  <CommuteSelector
                    id='commuteMethodInput'
                    placeholder='Commute Method'
                    value={commuteMethod}
                    label='Commute Method:'
                    setCommuteMethod={setCommuteMethod}
                    isRequired={true}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <FormField
                    id='startTimeInput'
                    type='dateTime-local'
                    placeholder='Start Time'
                    value={startTime}
                    label='Start Time:'
                    isRequired={true}
                    onChange={(event) => {
                      // event.target.value = event.target.value.substring(0, 16) // fixes invalid input on ios safari? can't test
                      setStartTime(event.target.value)
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <DurationSelector
                    id='durationInput'
                    label='Duration:'
                    defaultValue={duration}
                    onHourChange={(event) =>
                      setDuration((duration) => ({
                        ...duration,
                        hours: Number(event.target.value)
                      }))
                    }
                    onMinuteChange={(event) =>
                      setDuration((duration) => ({
                        ...duration,
                        minutes:
                          Math.round(Number(event.target.value) / 15) * 15
                      }))
                    }
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
            </tbody>
          </table>

          <FormField
            id='notesInput'
            type='textarea'
            placeholder='Add notes here'
            value={notes}
            label='Notes:'
            isRequired={false}
            onChange={(event) => setNotes(event.target.value)}
          />
          <div className='p- mx-auto my-2 flex flex-col '>
            <button
              className='text-bold rounded bg-primary px-12 py-4 text-white drop-shadow-default active:bg-dark-red disabled:bg-dark-gray'
              disabled={!isSubmitEnabled()}
              type='submit'
            >
              Submit
            </button>
            <Link href='/visit'>
              <button
                type='button'
                className='text-bold mt-2 rounded bg-primary p-1 px-12 py-4 text-white drop-shadow-default active:bg-dark-red'
                onClick={() => {
                  userDoc.visits.splice(Number(id), 1)
                  updateVisit?.(userDoc)
                }}
                hidden={id === null} // button should be hidden if no id
              >
                Remove
              </button>
            </Link>
          </div>
        </form>
        <div hidden={id === null}>
          <VetConcernButton />
        </div>
        <div className='py-2' hidden={id === null}>
          <ReportButton />
        </div>
      </>
    </div>
  )
}

export default withProtected(Visit)
