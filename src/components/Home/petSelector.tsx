import { Dispatch, SetStateAction, useState } from 'react'
import { default as ReactSelect } from 'react-select'
import { MultiValue } from 'react-select'

const petOptions = [
  { value: 'Willow', label: 'Willow' },
  { value: 'Nala', label: 'Nala' },
  { value: 'Coco', label: 'Coco' },
  { value: 'Nigi', label: 'Nigi' }
]

type Props = {
  pets: Array<string>
  setPets: Dispatch<SetStateAction<Array<string>>>
}

type MyOption = { value: string; label: string }

function PetSelector({ setPets }: Props) {
  const [petSelected, setPetSelected] = useState<MultiValue<MyOption>>()

  const handleChange = (selected: MultiValue<MyOption>) => {
    setPetSelected(selected)
    setPets(Object.values(selected).map((val) => val.value))
  }

  return (
    <div>
      <label htmlFor='pets'>Select Pets</label>
      <ReactSelect
        name='pets'
        options={petOptions}
        closeMenuOnSelect={false}
        value={petSelected}
        isMulti
        hideSelectedOptions={false}
        onChange={handleChange}
      />
    </div>
  )
}

export default PetSelector
