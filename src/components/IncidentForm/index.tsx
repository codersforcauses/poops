import { useForm } from 'react-hook-form'
import { IncidentForm } from '@/types'
import FormInput, { FormInputProps } from './InputField'

type IncidentProps = {
  isVetVisit: boolean
}

const IncidentForm: React.FC<IncidentProps> = ({ isVetVisit }) => {
  // TODO: Replace dummy data with server data
  const user = {
    id: '9c25d625-a4e0-44ec-89a7-a605f222b2c1',
    name: 'Jane Doe',
    email: 'jane.doe@test.com'
  }
  const visit = {
    petName: 'Spot'
  }

  const { register, handleSubmit } = useForm<IncidentForm>({
    defaultValues: {
      userName: user.name,
      email: user.email,
      petName: visit.petName,
      vetName: '',
      // TODO: Use firebase server time
      date: new Date(),
      time: new Date(),
      details: ''
    }
  })

  // TODO: Add attribute for column size
  const formInputs: Omit<FormInputProps, 'register'>[] = [
    { label: 'Full Name', field: 'userName', required: true },
    { label: 'Email', field: 'email', required: true },
    { label: 'Pet Name', field: 'petName', required: true },
    { label: 'Vet Name', field: 'vetName', required: true },
    { label: 'Date', field: 'date', required: true },
    { label: 'Time', field: 'time', required: false },
    { label: 'Details', field: 'details', required: true }
  ]

  // TODO: Send email / save incident to DB
  const onSubmit = handleSubmit((data) => {
    console.log('SEND EMAIL')
    console.log(data)
  })

  return (
    <form className='mt-4 flex flex-col px-2' onSubmit={onSubmit}>
    {/* TODO: Add button to hide module*/}
      {formInputs.map((input) => {
        return (
          // Hide input field when not a vet visit
          (input.field !== 'vetName' || isVetVisit) && (
            <FormInput
              key={input.field}
              label={input.label}
              field={input.field}
              required={input.required}
              register={register}
            />
          )
        )
      })}

      <button
        type='button'
        className='mx-auto mt-2 w-fit rounded-lg bg-primary py-1 px-4 text-lg text-white focus:outline-primary'
        onClick={onSubmit}
      >
        Submit
      </button>
    </form>
  )
}

export default IncidentForm
