import { HTMLInputTypeAttribute } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { IncidentForm } from '@/types'

export type FormInputProps = {
  label: string
  field: keyof IncidentForm
  type: HTMLInputTypeAttribute
  required: boolean
  register: UseFormRegister<IncidentForm>
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  field,
  type,
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
        type={type}
        className='rounded-lg border border-black py-1 px-2 selection:bg-primary/70 selection:text-white focus:outline-primary active:ring active:ring-primary'
        {...register(field)}
      />
    </div>
  )
}

export default FormInput
