import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Alert from '@/components/UI/alert'
import ExpandTransition from '@/components/UI/expandTransition'
import { IncidentForm } from '@/types'

import FormInput, { FormInputProps } from './formInput'

type IncidentProps = {
  isExpanded: boolean
  isVetVisit: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const IncidentForm: React.FC<IncidentProps> = ({
  isExpanded,
  isVetVisit,
  setIsExpanded
}) => {
  // TODO: Replace dummy data with server data
  const user = {
    id: '9c25d625-a4e0-44ec-89a7-a605f222b2c1',
    name: 'Jane Doe',
    email: 'jane.doe@test.com'
  }
  const visit = {
    petName: 'Spot'
  }

  //const today = new Date()

  const [text, setText] = useState('')
  const [variant, setVariant] = useState('info')

  const { register, handleSubmit } = useForm<IncidentForm>({
    defaultValues: {
      userName: user.name,
      email: user.email,
      petName: visit.petName,
      vetName: '',
      // TODO: Use firebase server time
      date: '',
      time: '',
      details: ''
    }
  })

  const formInputs: Omit<FormInputProps, 'register'>[] = [
    { label: 'Pet Name', type: 'text', field: 'petName', required: true },
    { label: 'Vet Name', type: 'text', field: 'vetName', required: true },
    { label: 'Date', type: 'date', field: 'date', required: true },
    { label: 'Time', type: 'time', field: 'time', required: false },
    { label: 'Details', type: 'text', field: 'details', required: true }
  ]

  // TODO: Send email / save incident to DB
  const onSubmit = handleSubmit((data) => {
    console.log('SEND EMAIL')
    console.log(data)
  })

  return (
    <>
    <Alert
    text={text}
    setText={setText}
    variant={
      (variant === 'info' || variant === 'problem' || variant === 'comment')
        ? variant
        : 'info'
    }
    />
    <ExpandTransition isExpanded={isExpanded}>
      <form className='mt-4 flex flex-col px-2' onSubmit={onSubmit}>
        {formInputs.map((input) => {
          return (
            // Hide input field when not a vet visit
            (input.field !== 'vetName' || isVetVisit) && (
              <FormInput
                key={input.field}
                label={input.label}
                type={input.type}
                field={input.field}
                required={input.required}
                register={register}
              />
            )
          )
        })}

        <span className='m-auto space-x-2'>
          <button
            type='button'
            className='mx-auto mt-2 w-fit rounded-lg border border-primary  py-1 px-4 text-lg shadow-md focus:outline-primary '
            onClick={() => {
              setIsExpanded(false)
              setVariant('problem')
              setText('cancelled incident')
            }}
          >
            Cancel
          </button>
          <button
            type='button'
            className='mx-auto mt-2 w-fit rounded-lg bg-primary py-1 px-4 text-lg text-white shadow-md focus:outline-primary '
            onClick={() => {
              onSubmit
              setVariant('info')
              setText('In orci velit, gravida eu leo non, convallis semper tellus. Nullam rutrum consequat sapien, et semper sapien tempor sed. Nunc lobortis fringilla nisi, ac auctor enim dictum eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.')
            }}
          >
            Submit
          </button>
        </span>
      </form>
    </ExpandTransition>
    </>
  )
}

export default IncidentForm
