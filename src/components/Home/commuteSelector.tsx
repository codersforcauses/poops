import { Dispatch, SetStateAction, useState } from 'react'
import { default as ReactSelect } from 'react-select'
import { SingleValue } from 'react-select'

import singleStyles from '@/components/Home/singleStyles'

const commuteOptions = [
  { value: 'Walk', label: 'Walk' },
  { value: 'Drive', label: 'Drive' },
  { value: 'Public Transport', label: 'Public Transport' },
  { value: 'Other', label: 'Other' }
]

type Props = {
  commute: string
  setCommute: Dispatch<SetStateAction<string>>
}

type MyOption = { value: string; label: string }

function CommuteSelector({ setCommute }: Props) {
  const [commuteSelected, setCommuteSelected] =
    useState<SingleValue<MyOption>>()

  const handleChange = (selected: SingleValue<MyOption>) => {
    setCommuteSelected(selected)
    if (selected == null) return
    setCommute(selected.value)
  }

  return (
    <div className='flex flex-col p-1'>
      <label htmlFor='commute' className='font-bold'>
        <span className='text-primary'>*</span>
        Commute Method
      </label>
      <ReactSelect
        name='commute'
        options={commuteOptions}
        value={commuteSelected}
        onChange={handleChange}
        styles={singleStyles}
      />
    </div>
  )
}

export default CommuteSelector
