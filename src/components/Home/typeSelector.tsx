import { Dispatch, SetStateAction, useState } from 'react'
import { default as ReactSelect } from 'react-select'
import { SingleValue } from 'react-select'

const typeOptions = [
  { value: 'Vet', label: 'Vet' },
  { value: 'Walk', label: 'Walk' },
  { value: 'Transportation', label: 'Transportation' }
]

type Props = {
  type: string
  setType: Dispatch<SetStateAction<string>>
}

type MyOption = { value: string; label: string }

function TypeSelector({ setType }: Props) {
  const [typeSelected, setTypeSelected] = useState<SingleValue<MyOption>>()

  const handleChange = (selected: SingleValue<MyOption>) => {
    setTypeSelected(selected)
    if (selected == null) return
    setType(selected.value)
  }

  return (
    <div>
      <label htmlFor='type'>
        <span className='text-primary'>*</span>Type of Visit
      </label>
      <ReactSelect
        name='type'
        options={typeOptions}
        value={typeSelected}
        onChange={handleChange}
      />
    </div>
  )
}

export default TypeSelector
