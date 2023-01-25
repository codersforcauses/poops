import { useState } from 'react'
import { useSetAtom } from 'jotai'
import Select, { MultiValue, StylesConfig } from 'react-select'

import { contactFormAtom } from '@/atoms/contacts'
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

const RegionSelector = ({ regions }: Props) => {
  const setContactForm = useSetAtom(contactFormAtom)
  const [regionValue, setRegionValue] = useState<MultiValue<MyOption>>()

  const handleChange = (newValue: MultiValue<MyOption>) => {
    setRegionValue(newValue)
    setContactForm((prev) =>
      prev
        ? {
            ...prev,
            region: newValue.map((v) => v.value)
          }
        : null
    )
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
