import { useRouter } from 'next/dist/client/router'
import { Timestamp } from 'firebase/firestore'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/UI/button'
import Form from '@/components/UI/FormComponents/Form'
import TextField from '@/components/UI/FormComponents/TextField'
import validationSchema from '@/components/Visit/VetForm/validation'
import { useAuth } from '@/context/Firebase/Auth/context'
import sendEmail from '@/hooks/email'
import { useMutateVetConcerns } from '@/hooks/vetconcerns'
import { Status, VetConcern } from '@/types/types'
import { formatTimestamp } from '@/utils'

interface FormValues {
  userName: string
  userEmail: string
  petName: string
  time: string
  vetName: string
  detail: string
}

interface VetFormProps {
  docId: string
  clientName: string
  pets: string
  visitTime: Timestamp
}

const formatIncident = (data: VetConcern) => {
  return `Vet Concerns
User ID: ${data.userId}
Username: ${data.userName}
Email: ${data.userEmail}
Created At: ${formatTimestamp(data.createdAt)}

Client Name: ${data.clientName}
Pet Name: ${data.petName}
Visit ID: ${data.visitId}
Visit Time: ${formatTimestamp(data.visitTime)}

Details: ${data.detail}`
}

const VetForm = (props: VetFormProps) => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const { mutate: mutateVetConcerns } = useMutateVetConcerns()

  const handleSubmit: SubmitHandler<FormValues> = async (formData) => {
    if (currentUser) {
      const { time, ...rest } = formData

      const data: VetConcern = {
        ...rest,
        userId: currentUser.uid,
        userPhone: currentUser.phoneNumber ?? '',
        clientName: props.clientName,
        visitTime: Timestamp.fromDate(new Date(time)),
        visitId: props.docId,
        createdAt: Timestamp.fromDate(new Date()),
        status: Status.unresolved
      }
      const message = {
        subject: 'Vet Concerns Report',
        text: formatIncident(data)
      }
      mutateVetConcerns(data)
      await sendEmail(message)
      router.push('/visit')
    }
  }

  return (
    <Form<FormValues>
      className='pt-3'
      onSubmit={handleSubmit}
      defaultValues={
        currentUser
          ? {
              userName: currentUser.displayName || '',
              userEmail: currentUser.email || '',
              petName: props.pets,
              visitTime: formatTimestamp(props.visitTime) || ''
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
                name='userEmail'
                label='Email'
                type='email'
                rules={validationSchema.userEmail}
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
                name='vetName'
                label='Vet Name'
                type='text'
                rules={validationSchema.vetName}
              />
            </td>
          </tr>
          <tr className='align-top'>
            <td colSpan={2}>
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
                name='detail'
                label='Description'
                type='textarea'
                placeholder='Add notes here'
                rules={validationSchema.detail}
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

export default VetForm

export type VetFormValues = keyof FormValues
