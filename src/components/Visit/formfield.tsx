export interface FormFieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void
  isRequired: boolean
}

const FormField = (props: FormFieldProps) => {
  return (
    <div className='flex flex-col p-1'>
      <label htmlFor={props.id} className='font-bold'>
        <span className='text-primary'>{props.isRequired ? '*' : ''}</span>
        {props.label}
      </label>
      {inputSwitch(props)}
    </div>
  )
}

const inputSwitch = (props: FormFieldProps) => {
  switch (props.type) {
    case 'textarea':
      return (
        <textarea
          className='form-textarea rounded text-black'
          id={props.id}
          placeholder={props.placeholder}
          onChange={props.onChange}
        ></textarea>
      )
    case 'select':
      return (
        <select
          className='form-select rounded'
          id={props.id}
          required={props.isRequired}
          onChange={props.onChange}
        >
          <option value=''></option> {/* :^) */}
          <option value='Vet'>Vet</option>
          <option value='Walk'>Walk</option>
        </select>
      )
    default:
      return (
        <input
          className='placeholder::text-[#6b7280] form-input rounded text-black'
          id={props.id}
          type={props.type}
          step={props.type === 'number' ? '0.001' : undefined}
          required={props.isRequired}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      )
  }
}

export default FormField
