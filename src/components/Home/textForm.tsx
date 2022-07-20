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
        <b>{props.label}</b>
      </label>
      <input
        className='mt-1 mb-2 flex h-9 rounded border py-0.5 px-4 text-center focus:outline-none'
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
