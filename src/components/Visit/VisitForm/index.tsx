import { SubmitHandler } from 'react-hook-form'

import Form from '@/components/UI/FormComponents/Form'
import TextField from '@/components/UI/FormComponents/TextField'
import { useFirestore } from '@/context/Firebase/Firestore/context'
import { Duration } from '@/types/types'

interface FormValues {
  visitType: string
  clientName: string
  startTime: string
  duration: Duration
  walkDist: number
  commuteDist: number
  commuteMethod: string
  notes: string
}

export const VisitForm = () => {
  const { userDoc, updateVisit } = useFirestore()

  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('submitted')
  }

  return (
    <Form<FormValues> onSubmit={handleSubmit}>
      <TextField label='Visit Type:' type='text' name='visitType' setFocused />
    </Form>
  )
}

export type VisitFormValues = keyof FormValues
