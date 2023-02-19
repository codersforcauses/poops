import { useRouter } from 'next/dist/client/router'
import { Timestamp } from 'firebase/firestore'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/UI/button'
import Form from '@/components/UI/FormComponents/Form'
import TextField from '@/components/UI/FormComponents/TextField'
import validationSchema from '@/components/Visit/IncidentForm/validation'
import { useAuth } from '@/context/Firebase/Auth/context'
import sendEmail from '@/hooks/email'
import { useMutateIncidents } from '@/hooks/incidents'
import { Incident } from '@/types/types'
import { formatTimestamp } from '@/utils'

interface FormValues {
  userName: string
  email: string
  petName: string
  time: string
  details: string
}

interface IncidentFormProps {
  docId: string
  clientName: string
  pets: string
  visitTime: Timestamp
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

const IncidentForm = (props: IncidentFormProps) => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const { mutate: mutateIncidents } = useMutateIncidents()

  const handleSubmit: SubmitHandler<FormValues> = async (formData) => {
    if (currentUser) {
      const { time, ...rest } = formData

      const data: Incident = {
        ...rest,
        clientName: props.clientName,
        createdAt: Timestamp.fromDate(new Date()),
        time: Timestamp.fromDate(new Date(time)),
        userID: currentUser.uid,
        visitId: props.docId,
        visitTime: props.visitTime
      }

      mutateIncidents(data)

      const message = {
        subject: 'Incident Report',
        text: formatIncident(data)
      }
      // await fetch('/api/sendEmail', {
      //   method: 'POST',
      //   body: JSON.stringify(message)
      // }) 
      await sendEmail(message)

      router.push('/visit')
    }
  }

  return (
    <Form<FormValues>
      onSubmit={handleSubmit}
      defaultValues={
        currentUser
          ? {
              userName: currentUser.displayName || '',
              email: currentUser.email || '',
              time: formatTimestamp(props.visitTime),
              petName: props.pets
            }
          : {}
      }
    >
      <table className='container mx-auto table-fixed border-separate border-spacing-2'>
        <tbody>
          <tr className='align-top'>
            <td>
              <TextField
                name='userName'
                label='Name'
                type='text'
                rules={validationSchema.userName}
              />
            </td>
            <td>
              <TextField
                name='email'
                label='Email'
                type='email'
                rules={validationSchema.email}
              />
            </td>
          </tr>
          <tr className='align-top'>
            <td>
              <TextField
                name='petName'
                label='Pet Name'
                type='text'
                rules={validationSchema.petName}
              />
            </td>
            <td>
              <TextField
                name='time'
                label='Date & Time'
                type='dateTime-local'
                placeholder='Time'
                rules={validationSchema.time}
              />
            </td>
          </tr>
          <tr className='align-top'>
            <td colSpan={2}>
              <TextField
                name='details'
                label='Description'
                type='textarea'
                placeholder='Add notes here'
                rules={validationSchema.details}
              />
            </td>
          </tr>
          <tr className='align-top'>
            <td colSpan={2}>
              <Button type='submit' fullwidth>
                Submit
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Form>
  )
}

export default IncidentForm

export type IncidentFormValues = keyof FormValues
