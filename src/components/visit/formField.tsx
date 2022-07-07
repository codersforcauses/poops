interface FormFieldProps {
  id: string
  label: string
  type: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isRequired: boolean
}

const FormField = (props: FormFieldProps) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={props.id} className='font-bold'>
        <span className='text-primary'>{props.isRequired ? '*' : ''}</span>
        {props.label}
      </label>
      <input
        className='rounded'
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default FormField
