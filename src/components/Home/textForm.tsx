export interface FormFieldProps {
  id: string
  label: string
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

function TextForm(props: FormFieldProps) {
  return (
    <div className='flex flex-col p-1'>
      <label htmlFor={props.id}>
        <span className='text-primary'>*</span>
        <b>{props.label}</b>
      </label>
      <input
        className='mt-1 mb-2 flex h-9 rounded border border-[#6b7280] py-0.5 px-4 text-center focus:outline-none'
        id={props.id}
        type='text'
        required={true}
        placeholder='Enter...'
        onChange={props.onChange}
      />
    </div>
  )
}

export default TextForm
