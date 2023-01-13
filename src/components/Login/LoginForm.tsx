import { SelectOption } from '@/types/types'

export interface FormProps {
  id: string
  label: string
  type: string
  isNumPad: boolean
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
      <label htmlFor={props.id} className='text-xs italic text-[#828282]'>
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
          className='px-auto focus:border-dark-red mt-1 mb-2 flex h-9 border-b border-[#6b7280] py-0.5 text-center focus:border-b-2 focus:outline-none'
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
    case 'password':
      return (
        <input
          className='focus:border-dark-red mt-1 mb-2 flex h-9 border-b border-[#6b7280] py-0.5 px-4 text-left
          placeholder:text-black focus:border-b-2 focus:outline-none'
          id={props.id}
          type='password'
          required={props.isRequired}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      )
    case 'text':
      if (props.isNumPad) {
        return (
          <input
            className='focus:border-dark-red mt-1 mb-2 flex h-9 border-b border-[#6b7280] py-0.5 px-4 text-left
          placeholder:text-black focus:border-b-2 focus:outline-none'
            id={props.id}
            type='text'
            required={props.isRequired}
            placeholder={props.placeholder}
            onChange={props.onChange}
            pattern='\d*'
          />
        )
      } else {
        return (
          <input
            className='focus:border-dark-red mt-1 mb-2 flex h-9 border-b border-[#6b7280] py-0.5 px-4 text-left
            placeholder:text-black focus:border-b-2 focus:outline-none'
            id={props.id}
            type='text'
            required={props.isRequired}
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
        )
      }
  }
}
export default Form
