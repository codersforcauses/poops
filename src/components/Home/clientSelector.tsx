import { Dispatch, SetStateAction, useState } from 'react'
import { default as ReactSelect } from 'react-select'
import { MultiValue } from 'react-select'

import multiStyles from '@/components/Home/multiStyles'

const clientOptions = [
  { value: 'Jeffrey', label: 'Jeffrey' },
  { value: 'George', label: 'George' },
  { value: 'Nancy', label: 'Nancy' },
  { value: 'Michelle', label: 'Michelle' }
]

type Props = {
  clients: Array<string>
  setClients: Dispatch<SetStateAction<Array<string>>>
}

type MyOption = { value: string; label: string }

function ClientSelector({ setClients }: Props) {
  const [clientSelected, setClientSelected] = useState<MultiValue<MyOption>>()

  const handleChange = (selected: MultiValue<MyOption>) => {
    setClientSelected(selected)
    setClients(Object.values(selected).map((val) => val.value))
  }

  return (
    <div className='flex flex-col p-1'>
      <label htmlFor='clients'>
        <span className='text-primary'>*</span>
        <b>Select Clients</b>
      </label>
      <ReactSelect
        name='clients'
        options={clientOptions}
        closeMenuOnSelect={false}
        value={clientSelected}
        isMulti
        hideSelectedOptions={false}
        onChange={handleChange}
        styles={multiStyles}
      />
    </div>
  )
}

export default ClientSelector
