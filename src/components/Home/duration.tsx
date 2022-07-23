export interface durationProps {
  id: string
  type: string
  value: string
}

function Duration(props: durationProps) {
  return (
    <div className='flex flex-col p-1'>
      <label htmlFor={props.id}>
        <b>Visit Duration</b>
      </label>
      <input
        className='mt-1 mb-2 flex h-9 rounded border border-[#6b7280] py-0.5 px-4 text-center focus:outline-none'
        id={props.id}
        type={props.type}
        value={props.value}
        readOnly
      />
    </div>
  )
}

export default Duration
