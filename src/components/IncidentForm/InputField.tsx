import { IncidentForm } from '@/types'
import { UseFormRegister } from 'react-hook-form'

export type FormInputProps = {
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

export default FormInput
