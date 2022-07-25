import { Dispatch, SetStateAction, useState } from 'react'
import { default as ReactSelect } from 'react-select'
import { SingleValue } from 'react-select'

import singleStyles from '@/components/Home/singleStyles'

const clientOptions = [
  { value: 'Jeffrey', label: 'Jeffrey' },
  { value: 'George', label: 'George' },
  { value: 'Nancy', label: 'Nancy' },
  { value: 'Michelle', label: 'Michelle' }
]

type Props = {
  client: string
  setClient: Dispatch<SetStateAction<string>>
}

type MyOption = { value: string; label: string }

function ClientSelector({ setClient }: Props) {
  const [clientSelected, setClientSelected] = useState<SingleValue<MyOption>>()

  const handleChange = (selected: SingleValue<MyOption>) => {
    setClientSelected(selected)
    if (selected == null) return
    setClient(selected.value)
  }

  return (
    <div className='flex flex-col p-1'>
      <label htmlFor='client'>
        <span className='text-primary'>*</span>
        <b>Select Clients</b>
      </label>
      <ReactSelect
        name='client'
        options={clientOptions}
        value={clientSelected}
        onChange={handleChange}
        styles={singleStyles}
      />
    </div>
  )
}

export default ClientSelector
