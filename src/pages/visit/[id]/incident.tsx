import { FormEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Timestamp } from 'firebase/firestore'

import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import FormField from '@/components/Visit/formfield'
import { useAuth } from '@/context/Firebase/Auth/context'
import { useMutateIncidents } from '@/hooks/incidents'
import { useVisits } from '@/hooks/visits'
import { Incident } from '@/types/types'
import { formatTimestamp } from '@/utils'

const Incident = () => {
  const { currentUser } = useAuth()
  const { mutate: mutateIncidents } = useMutateIncidents()
  const { data: visits } = useVisits()

  const router = useRouter()
  const { id: queryId } = router.query
  const visitId =
    queryId === undefined || Array.isArray(queryId) ? null : queryId

  const visit = visits?.find((visit) => queryId && visit.docId === visitId)

  const defaultPets = visit?.petNames ?? ''

  const [userName, setUserName] = useState(
    currentUser?.displayName ? currentUser?.displayName : ''
  )
  const [email, setEmail] = useState('')
  const [time, setTime] = useState('') //check issue comments for date/time
  const [notes, setNotes] = useState('')
  const [petName, setPetName] = useState(visit?.petNames || '')

  const userId = useRef('')
  const userPhone = useRef('')
  const client = useRef('')

  useEffect(() => {
    // prefilling any form values.
    if (visit === undefined || currentUser == null) return

    const { petNames, startTime, clientName } = visit

    const displayName = currentUser.displayName ?? ''
    const email = currentUser.email ?? ''
    const visitTime = formatTimestamp(startTime)

    setUserName(displayName)
    setEmail(email)
    setTime(visitTime ?? '')
    setPetName(petNames)

    userId.current = currentUser.uid
    userPhone.current = currentUser.phoneNumber ? currentUser.phoneNumber : ''
    client.current = clientName
  }, [visit, currentUser])

  const handleSubmit = async (click: FormEvent<HTMLFormElement>) => {
    click.preventDefault()
    if (currentUser !== null) {
      const data: Incident = {
        userID: currentUser.uid,
        userName: userName,
        clientName: client.current,
        visitId: visitId ? visitId : '',
        visitTime: Timestamp.fromDate(new Date(time)),
        email: email,
        petName: petName,
        time: Timestamp.fromDate(new Date(time)),
        details: notes,
        createdAt: Timestamp.fromDate(new Date())
      }
      mutateIncidents(data)

      const message = {
        subject: 'Incident Report',
        text: formatIncident(data)
      }
      await fetch('/api/sendEmail', {
        method: 'POST',
        body: JSON.stringify(message)
      })

      router.push('/visit')
    }
  }

  const formatIncident = (data: Incident) => {
    return `Incident Report
User ID: ${data.userID}
Username: ${data.userName}
Email: ${data.email}
Created At: ${formatTimestamp(data.createdAt)}

Client Name: ${data.clientName}
Pet Name: ${data.petName}
Visit ID: ${data.visitId}
Visit Time: ${formatTimestamp(data.visitTime)}

Incident Time: ${formatTimestamp(data.time)}
Details: ${data.details}`
  }

  const isSubmitEnabled = () => {
    return currentUser?.uid && userName && email && petName && time && notes
  }

  return (
    <div className='z-50 p-4'>
      <>
        <div className='fixed right-5 top-4 z-[100] h-10 w-10 rounded-full bg-primary p-1 drop-shadow-default'>
          <Link href='/visit'>
            <button>
              <XMarkIcon className='h-full w-full text-white' />
            </button>
          </Link>
        </div>

        <div className='border-b-2 border-primary py-3 pt-10'>
          <h1 className='pl-2 text-2xl font-bold'>Add Your Incident</h1>
        </div>

        <form className='pt-3' onSubmit={handleSubmit}>
          <table className='container mx-auto table-fixed'>
            <tbody>
              <tr>
                <td>
                  <FormField
                    id='userNameInput'
                    type='text'
                    placeholder={userName}
                    label='Name'
                    isRequired={false}
                    onChange={(event) => setUserName(event.target.value)}
                  />
                </td>
                <td>
                  <FormField
                    id='emailInput'
                    type='email'
                    placeholder={email}
                    label='Email'
                    isRequired={false}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormField
                    id='petNameInput'
                    type='text'
                    placeholder={defaultPets}
                    label='Pet Name'
                    isRequired={false}
                    onChange={(event) => setPetName(event.target.value)}
                  />
                </td>
                <td>
                  <FormField
                    id='timeInput'
                    type='dateTime-local'
                    value={time}
                    placeholder='Time'
                    label='Date & Time'
                    isRequired={false}
                    onChange={(event) => setTime(event.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <FormField
            id='notesInput'
            type='textarea'
            placeholder='Add notes here'
            label='Description'
            isRequired={false}
            onChange={(event) => setNotes(event.target.value)}
          />
          <div className='mx-auto my-2 flex flex-col p-1 '>
            <Button type='submit' disabled={!isSubmitEnabled()}>
              Submit
            </Button>
          </div>
        </form>
      </>
    </div>
  )
}

export default withProtected(Incident)
