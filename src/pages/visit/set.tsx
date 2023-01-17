import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Timestamp } from 'firebase/firestore'

import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import ClientSelector from '@/components/Visit/clientselector'
import CommuteSelector from '@/components/Visit/commuteselector'
import DurationSelector from '@/components/Visit/durationselector'
import FormField from '@/components/Visit/formfield'
import { useMutateVisits, useVisits } from '@/hooks/visits'
import { Duration, Visit } from '@/types/types'
import { formatTimestamp, visitSelectOptions } from '@/utils'

const Set = () => {
  const { data: visits } = useVisits()
  const { mutate: mutateVisits } = useMutateVisits()

  const router = useRouter()
  const queryId = router.query.id
  const visitId =
    queryId === undefined || Array.isArray(queryId) ? null : queryId
  const visit = visits?.find((visit) => queryId && visit.docId === visitId)

  const [visitType, setVisitType] = useState<string>('')
  const [clientPetNames, setClientPetNames] = useState<{
    clientName: string
    petNames: string
  }>({ clientName: '', petNames: '' })
  const [startTime, setStartTime] = useState<string>('')
  const [duration, setDuration] = useState<Duration>({ hours: 0, minutes: 0 })
  const [walkDist, setWalkDist] = useState<number>(0)
  const [commuteDist, setCommuteDist] = useState<number>(0)
  const [commuteMethod, setCommuteMethod] = useState<string>('')
  const [notes, setNotes] = useState<string>('')

  useEffect(() => {
    if (visit === undefined) return
    const {
      type,
      clientName,
      petNames,
      startTime,
      duration,
      walkDist,
      commuteDist,
      commuteMethod
    } = visit

    setVisitType(type)
    setClientPetNames({ clientName, petNames })
    setStartTime(formatTimestamp(startTime) || '')
    setDuration(duration)
    setWalkDist(walkDist)
    setCommuteDist(commuteDist)
    setCommuteMethod(commuteMethod)
  }, [visit])

  const isNewVisit = visit === undefined || visit.docId === null

  const handleSubmit = async (click: React.FormEvent<HTMLFormElement>) => {
    click.preventDefault()

    const data: Visit = {
      clientName: clientPetNames.clientName,
      commuteDist: commuteDist,
      commuteMethod: commuteMethod,
      docId: isNewVisit || visitId === null ? undefined : visitId,
      duration: duration,
      notes: notes,
      petNames: clientPetNames.petNames,
      startTime: Timestamp.fromDate(new Date(startTime)),
      type: visitType,
      walkDist: walkDist
    }

    mutateVisits(data)

    router.push('/visit')
  }

  const handleDelete = async () => {
    const data: Visit = {
      clientName: clientPetNames.clientName,
      commuteDist: commuteDist,
      commuteMethod: commuteMethod,
      docId: isNewVisit || visitId === null ? undefined : visitId,
      duration: duration,
      notes: notes,
      petNames: clientPetNames.petNames,
      startTime: Timestamp.fromDate(new Date(startTime)),
      type: visitType,
      walkDist: walkDist
    }

    mutateVisits({ ...data, deleteDoc: true })

    router.push('/visit')
  }

  const isSubmitEnabled = () =>
    visitType &&
    clientPetNames &&
    startTime &&
    duration.hours >= 0 &&
    duration.minutes >= 0
  walkDist >= 0 && commuteDist >= 0 && commuteMethod

  return (
    <div className='space-4 z-50 flex h-full flex-col p-4'>
      {/* Exit Button */}
      <div className='fixed right-5 top-4 z-[100] h-10 w-10 rounded-full bg-primary drop-shadow-default'>
        <Link href='/visit'>
          <button>
            <XMarkIcon className='h-full w-full text-white' />
          </button>
        </Link>
      </div>

      {/* Heading */}
      <>
        <h1 className='p-2 text-2xl font-bold'>
          {isNewVisit ? 'Add' : 'Edit'} Your Visit
        </h1>
        <div className='my-2 box-content border-t-2 border-primary' />
      </>

      {/* Wrapper */}
      <div className='container mx-auto flex flex-col gap-2 p-2'>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* could rewrite to use awful react-select to make chevron icon consistent */}
          <div className='grid grid-cols-2 gap-4'>
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
            <ClientSelector
              id='clientNameInput'
              type='text'
              placeholder='Client Name'
              value={{
                label: clientPetNames.clientName,
                value: clientPetNames.clientName
              }}
              label='Client Name:'
              isRequired={true}
              setClient={setClientPetNames}
            />

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
            {/* react-select components have no native form validation but what we can do is disable the submit button if the input is empty */}
            <CommuteSelector
              id='commuteMethodInput'
              placeholder='Commute Method'
              value={{ label: commuteMethod, value: commuteMethod }}
              label='Commute Method:'
              setCommuteMethod={setCommuteMethod}
              isRequired={true}
            />

            <FormField
              className='col-span-2'
              id='startTimeInput'
              type='dateTime-local'
              placeholder='Start Time'
              value={startTime}
              label='Start Time:'
              isRequired={true}
              onChange={(event) => {
                event.target.value = event.target.value.substring(0, 16) // fixes invalid input on ios safari? can't test
                setStartTime(event.target.value)
              }}
            />

            <DurationSelector
              id='durationInput'
              label='Duration:'
              value={duration}
              onHourChange={(event) =>
                setDuration((duration) => ({
                  ...duration,
                  hours: Number(event.target.value)
                }))
              }
              onMinuteChange={(event) =>
                setDuration((duration) => ({
                  ...duration,
                  minutes: Math.round(Number(event.target.value) / 15) * 15
                }))
              }
            />

            <FormField
              id='walkDistInput'
              type='number'
              placeholder='Distance (km)'
              value={walkDist.toString()}
              label='Walk Distance:'
              isRequired={true}
              onChange={(event) => setWalkDist(parseFloat(event.target.value))}
            />

            <FormField
              className='col-span-2'
              id='notesInput'
              type='textarea'
              placeholder='Add notes here'
              value={notes}
              label='Notes:'
              isRequired={false}
              onChange={(event) => setNotes(event.target.value)}
            />

            <Button
              className='col-span-2'
              intent='primary'
              disabled={!isSubmitEnabled()}
              fullwidth
              size='large'
              type='submit'
            >
              Submit
            </Button>

            <Button
              className='col-span-2'
              intent='secondary'
              fullwidth
              onClick={handleDelete}
              hidden={isNewVisit} // button should be hidden if no id
              type='button'
            >
              Remove This Visit
            </Button>

            <Button
              intent='primary'
              size='medium'
              hidden={isNewVisit}
              fullwidth
              type='button'
            >
              Report
              <br />
              Incident
            </Button>

            <Button
              intent='primary'
              size='medium'
              hidden={isNewVisit}
              fullwidth
              type='button'
            >
              Register Vet
              <br />
              Concern
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withProtected(Set)
