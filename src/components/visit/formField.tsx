interface FormFieldProps {
  id: string
  label: string
  type: string
  placeholder?: string
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  isRequired: boolean
  additionalAttributes?: string[]
}

const FormField = (props: FormFieldProps) => {
  return (
    <div className='flex flex-col p-1'>
      <label htmlFor={props.id} className='font-bold'>
        <span className='text-primary'>{props.isRequired ? '*' : ''}</span>
        {props.label}
      </label>
      {props.type !== 'textarea' ? (
        <input
          className='form-input rounded text-[#6b7280]'
          id={props.id}
          type={props.type}
          step={props.type === 'number' ? '0.001' : undefined}
          required={props.isRequired}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      ) : (
        <textarea
          className='form-textarea rounded'
          id={props.id}
          placeholder={props.placeholder}
          onChange={props.onChange}
        ></textarea>
      )}
    </div>
  )
}

export default FormField
