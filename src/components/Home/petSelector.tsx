import { Dispatch, SetStateAction, useState } from 'react'
import { default as ReactSelect } from 'react-select'
import { MultiValue } from 'react-select'

const petOptions = [
  { value: 'Willow (Client)', label: 'Willow (Client)' },
  { value: 'Nala (Client)', label: 'Nala (Client)' },
  { value: 'Coco (Client)', label: 'Coco (Client)' },
  { value: 'Nigi (Client)', label: 'Nigi (Client)' }
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
    <div className='flex flex-col p-1'>
      <label htmlFor='pets'>
        <span className='text-primary'>*</span>
        Select Pets
      </label>
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
