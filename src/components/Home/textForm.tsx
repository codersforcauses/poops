export interface FormFieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  isRequired: boolean
}

function TextForm(props: FormFieldProps) {
  return (
    <div className='flex flex-col p-1'>
      <label htmlFor={props.id}>
        <span className='text-primary'>{props.isRequired ? '*' : ''}</span>
        {props.label}
      </label>
      <input
        className='placeholder::text-[#6b7280] form-input ma rounded text-black'
        id={props.id}
        type={props.type}
        required={props.isRequired}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  )
}

export default TextForm
