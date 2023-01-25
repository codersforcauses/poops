import { useRouter } from 'next/dist/client/router'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/UI/button'
import Form from '@/components/UI/FormComponents/Form'
import TextField from '@/components/UI/FormComponents/TextField'
import validationSchema from '@/components/Visit/IncidentForm/validation'
import { useAuth } from '@/context/Firebase/Auth/context'
import { useMutateIncidents } from '@/hooks/incidents'
import { Incident } from '@/types/types'

interface FormValues {
  userName: string
  visitTime: string
  email: string
  petName: string
  time: string
  details: string
}

interface IncidentFormProps {
  docId: string
  clientName: string
  pets: string
}

const IncidentForm = (props: IncidentFormProps) => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const { mutate: mutateIncidents } = useMutateIncidents()

  const handleSubmit: SubmitHandler<FormValues> = (formData) => {
    if (currentUser) {
      const data: Incident = {
        ...formData,
        userID: currentUser.uid,
        visitId: props.docId,
        clientName: props.clientName,
        createdAt: Date.now().toString()
      }

      mutateIncidents(data)

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
              userName: props.clientName || '',
              email: currentUser.email || '',
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
                name='notes'
                label='Description'
                type='textarea'
                placeholder='Add notes here'
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
