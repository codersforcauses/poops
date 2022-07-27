import { SelectOption } from '@/types/types'

export interface FormProps {
  id: string
  label: string
  type: string
  placeholder: string
  isRequired: boolean
  selectOptions?: SelectOption[]
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}

function Form(props: FormProps) {
  return (
    <div className='flex flex-col p-1'>
      <label htmlFor={props.id} className='font-bold'>
        <span className='text-primary'>*</span>
        {props.label}
      </label>
      {inputType(props)}
    </div>
  )
}

function inputType(props: FormProps) {
  switch (props.type) {
    case 'select':
      return (
        <select
          className='px-auto form-select mt-1 mb-2 flex h-9 rounded border border-[#6b7280] py-0.5 text-center focus:outline-none'
          id={props.id}
          required={props.isRequired}
          onChange={props.onChange}
          defaultValue={props.placeholder}
        >
          <option value=''>{props.placeholder}</option>
          {props.selectOptions?.map((o, i) => (
            <option key={i} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )
    case 'text':
      return (
        <input
          className='mt-1 mb-2 flex h-9 rounded border border-[#6b7280] py-0.5 px-4 text-center placeholder:text-black
            focus:outline-[#0066ff]'
          id={props.id}
          type='text'
          required={props.isRequired}
          placeholder={props.placeholder}
          onChange={props.onChange}
          pattern='\d*'
        />
      )
  }
}

export default Form
