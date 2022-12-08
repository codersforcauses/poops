import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/UI/button'
import Form from '@/components/UI/FormComponents/Form'
import CustomSelect from '@/components/UI/FormComponents/SelectFields/CustomSelect'
import SingleSelect from '@/components/UI/FormComponents/SelectFields/SingleSelect'
import { SelectOption } from '@/components/UI/FormComponents/SelectFields/utils'
import TextField from '@/components/UI/FormComponents/TextField'
import validationSchema from '@/components/Visit/VisitForm/validation'
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

const visitTypes: SelectOption[] = [
  {
    label: 'Label1',
    value: 'Value1'
  },
  {
    label: 'Label2',
    value: 'Value2'
  }
]

const defaultCommuteMethods: SelectOption[] = [
  {
    label: 'Bus',
    value: 'Bus'
  },
  {
    label: 'Car',
    value: 'Car'
  },
  {
    label: 'Train',
    value: 'Train'
  }
]

export const VisitForm = () => {
  const { userDoc, updateVisit } = useFirestore()

  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  return (
    <Form<FormValues> onSubmit={handleSubmit}>
      <TextField label='Text Field:' type='text' name='textField' setFocused />
      <SingleSelect<SelectOption>
        label='Visit Type:'
        name='visitType'
        options={visitTypes}
        isClearable
        isSearchable
        rules={validationSchema.visitType}
      />
      <CustomSelect<SelectOption>
        label='Commute Method:'
        name='commuteMethod'
        defaultOptions={defaultCommuteMethods}
        isClearable
        isSearchable
        rules={validationSchema.visitType}
      />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export type VisitFormValues = keyof FormValues
