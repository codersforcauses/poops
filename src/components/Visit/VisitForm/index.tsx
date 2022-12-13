import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/UI/button'
import Form from '@/components/UI/FormComponents/Form'
import CreateSelect from '@/components/UI/FormComponents/SelectFields/CreateSelect'
import CustomSelect from '@/components/UI/FormComponents/SelectFields/CustomSelect'
import DurationSelect from '@/components/UI/FormComponents/SelectFields/DurationSelect'
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
      <TextField
        label='Text Field:'
        type='text'
        name='textField'
        placeholder='hello'
      />
      <TextField
        label='Text Field:'
        type='textarea'
        name='textField'
        placeholder='hello'
      />
      <CustomSelect<SelectOption, false>
        label='Visit Type:'
        name='visitType'
        options={visitTypes}
        isClearable
        isSearchable
        rules={validationSchema.visitType}
      />
      <CreateSelect<SelectOption, false>
        label='Commute Method:'
        name='commuteMethod'
        options={defaultCommuteMethods}
        isClearable
        isSearchable
        rules={validationSchema.visitType}
      />
      <DurationSelect
        defaultValue={{
          hours: 0,
          minutes: 15
        }}
        name='duration'
        label='Duration:'
        rules={validationSchema.duration}
      />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export type VisitFormValues = keyof FormValues
