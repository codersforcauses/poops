import { HTMLInputTypeAttribute } from 'react'
import { UseFormRegister } from 'react-hook-form'

import ExpandTransition from '@/components/UI/expandTransition'
import { IncidentForm } from '@/types'

export type FormInputProps = {
  label: string
  field: keyof IncidentForm
  type: HTMLInputTypeAttribute
  required: boolean
  register: UseFormRegister<IncidentForm>
  isExpanded?: boolean | null
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  field,
  type,
  required,
  register,
  isExpanded
}) => {
  return (
    <ExpandTransition
      isExpanded={typeof isExpanded !== 'undefined' ? isExpanded : null}
    >
      <div className='m-auto mb-3 flex w-full flex-col'>
        <label className='mx-1 text-sm font-bold'>
          {required && <span className='text-primary'>*</span>}
          <span>{label}</span>
        </label>
        <input
          type={type}
          disabled={isExpanded === false ? true : false} // must use === as we are also wanting else to include null or undefined
          className='rounded-lg border border-black py-1 px-2 selection:bg-primary/70 selection:text-white focus:outline-primary active:ring active:ring-primary'
          {...register(field)}
        />
      </div>
    </ExpandTransition>
  )
}

export default FormInput
