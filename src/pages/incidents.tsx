import Header from '@/components/Header'
import { useForm, UseFormRegister } from 'react-hook-form'

type IncidentForm = {
  userID: string
  userName: string
  email: string
  petName: string
  vetName?: string
  date: Date
  time: Date
  details: string
}

type IncidentProps = {
  isVetVisit: boolean
}

const Incidents: React.FC<IncidentProps> = ({ isVetVisit }) => {
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
      date: new Date(),
      time: new Date(),
      details: ''
    }
  })

  const formInputs: Omit<FormInputProps, 'register'>[] = [
    { label: 'Full Name', field: 'userName', required: true },
    { label: 'Email', field: 'email', required: true },
    { label: 'Pet Name', field: 'petName', required: true },
    { label: 'Vet Name', field: 'vetName', required: true },
    { label: 'Date', field: 'date', required: true },
    { label: 'Time', field: 'time', required: false },
    { label: 'Details', field: 'details', required: true }
  ]

  const onSubmit = handleSubmit((data) => {
    console.log('SEND EMAIL')
    console.log(data)
  })

  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Incidents' />

      <main>
        <p>Incidents Page</p>

        <form className='mt-4 flex flex-col px-2' onSubmit={onSubmit}>
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
      </main>
    </>
  )
}

type FormInputProps = {
  label: string
  field: keyof IncidentForm
  required: boolean
  register: UseFormRegister<IncidentForm>
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  field,
  required,
  register
}) => {
  return (
    <div className='m-auto mb-3 flex w-full flex-col'>
      <label className='mx-1 text-sm font-bold'>
        {required && <span className='text-primary'>*</span>}
        <span>{label}</span>
      </label>
      <input
        className='rounded-lg border border-black py-1 px-2 selection:bg-primary/70 selection:text-white focus:outline-primary'
        {...register(field)}
      />
    </div>
  )
}

export default Incidents
