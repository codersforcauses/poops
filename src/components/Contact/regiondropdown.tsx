import { Dispatch, SetStateAction, useState } from 'react'
import Select, { StylesConfig, MultiValue } from 'react-select'
const regionOptions = [
  { value: 'Eastern', label: 'Eastern' },
  { value: 'Coastal South', label: 'Coastal South' },
  { value: 'Armadale', label: 'Armadale' },
  { value: 'Busselton', label: 'Busselton' },
  { value: 'Central ', label: 'Central ' },
  { value: 'Northern', label: 'Northern' },
  { value: 'Preston', label: 'Preston' },
  { value: 'Southern', label: 'Southern' },
  { value: 'Western', label: 'Western' }
]

type Props = {
  regions: Array<string>
  setRegions: Dispatch<SetStateAction<Array<string>>>
}
type MyOption = { label: string; value: string }

const customStyles: StylesConfig<MyOption> = {
  input: (provided) => ({
    ...provided,
    'input:focus': {
      boxShadow: 'none'
    }
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      border: '1px solid #ccc',
      borderColor: '#ce283d',
      color: '#ce283d',
      borderRadius: '2px'
    }
  }
}

const RegionSelector = ({ regions, setRegions }: Props) => {
  const [regionValue, setRegionValue] = useState<MultiValue<MyOption>>(
    // regions.map((r: string) => ({ value: r, label: r }))
  )

  const handleChange = (
    newValue: MultiValue<MyOption>
  ) => {
    setRegionValue(newValue)
    setRegions(Object.values(newValue).map((val) => val.value))
  }

  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        isMulti
        isClearable={false}
        options={regionOptions}
        value={regionValue}
        defaultValue={regions.map((r: string) => ({ value: r, label: r }))}
        styles={customStyles}
        onChange={handleChange}
      />
    </div>
  )
}

export default RegionSelector
