import { Dispatch, SetStateAction, useState } from 'react'
import { default as ReactSelect } from 'react-select'
import { SingleValue } from 'react-select'

import singleStyles from '@/components/Home/singleStyles'

const typeOptions = [
  { value: 'Vet', label: 'Vet' },
  { value: 'Walk', label: 'Walk' }
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
    <div className='flex flex-col p-1'>
      <label htmlFor='type'>
        <span className='text-primary'>*</span>
        <b>Type of Visit</b>
      </label>
      <ReactSelect
        name='type'
        options={typeOptions}
        value={typeSelected}
        onChange={handleChange}
        styles={singleStyles}
      />
    </div>
  )
}

export default TypeSelector
