import { Dispatch, SetStateAction, useState } from 'react'
import { default as ReactSelect } from 'react-select'
import { SingleValue } from 'react-select'

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
    <div>
      <label htmlFor='commute'>Commute Method</label>
      <ReactSelect
        name='commute'
        options={commuteOptions}
        value={commuteSelected}
        onChange={handleChange}
      />
    </div>
  )
}

export default CommuteSelector
