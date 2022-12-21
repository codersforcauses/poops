import { Dispatch, SetStateAction, useState } from 'react'
import { MultiValue, StylesConfig } from 'react-select'
import Creatable from 'react-select/creatable'

const roles = [
  { value: 'Volunteer', label: 'Volunteer' },
  { value: 'Client', label: 'Client' },
  { value: 'Coordinator', label: 'Coordinator' }
]
type Props = {
  tags: Array<string>
  setTags: (tags: string[]) => void
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

const TagSelector = ({ tags, setTags }: Props) => {
  const [roleValue, setRoleValue] = useState<MultiValue<MyOption>>()

  const handleChange = (newValue: MultiValue<MyOption>) => {
    setRoleValue(newValue)
    setTags(Object.values(newValue).map((val) => val.value))
  }
  return (
    <div>
      <Creatable
        onChange={handleChange}
        closeMenuOnSelect={false}
        isMulti
        isClearable={false}
        options={roles}
        value={roleValue}
        defaultValue={tags.map((t: string) => ({ value: t, label: t }))}
        styles={customStyles}
      />
    </div>
  )
}

export default TagSelector
