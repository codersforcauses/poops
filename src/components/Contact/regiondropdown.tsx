import { Dispatch, SetStateAction, useState } from 'react'
import Select from 'react-select'
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

const customStyles = {
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
type Props = {
  regions: Array<string>
  setRegions: Dispatch<SetStateAction<Array<string>>>
}

const RegionSelector = ({ regions, setRegions }: Props) => {
  const [regionValue, setRegionValue] = useState(
    regions.map((r: string) => ({ value: r, label: r }))
  )
  const handleChange = (field: string, value: []) => {
    switch (field) {
      case 'roles':
        setRegionValue(value)
        setRegions(value.map((val) => val['value']))
        break

      default:
        break
    }
  }
  return (
    <div>
      <Select
        onChange={(value) => handleChange('roles', value)}
        closeMenuOnSelect={false}
        isMulti
        isClearable={false}
        options={regionOptions}
        value={regionValue}
        defaultValue={regions.map((r: string) => ({ value: r, label: r }))}
        styles={customStyles}
      />
    </div>
  )
}

export default RegionSelector
