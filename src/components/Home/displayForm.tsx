export interface FormFieldProps {
  id: string
  label: string
  value: string | number
}

function DisplayForm(props: FormFieldProps) {
  return (
    <div className='flex flex-col p-1'>
      <label htmlFor={props.id}>
        <b>{props.label}</b>
      </label>
      <input
        className='mt-1 mb-2 flex h-9 rounded border border-[#6b7280] py-0.5 px-4 text-center focus:outline-none'
        id={props.id}
        type='text'
        value={props.value}
        readOnly
      />
    </div>
  )
}

export default DisplayForm
