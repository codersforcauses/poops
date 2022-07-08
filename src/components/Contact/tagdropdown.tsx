import { useState } from 'react'
import Creatable from 'react-select/creatable'

const roles = [
  { value: 'Volunteer', label: 'Volunteer' },
  { value: 'Client', label: 'Client' },
  { value: 'Coordinator', label: 'Coordinator' }
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

const TagSelector = ({ tags }) => {
  const [roleValue, setRoleValue] = useState(
    tags.map((t: string) => ({ value: t, label: t }))
  )

  const handleChange = (field: string, value: []) => {
    switch (field) {
      case 'roles':
        setRoleValue(value)
        break

      default:
        break
    }
  }

  return (
    <div>
      <Creatable
        onChange={(value) => handleChange('roles', value)}
        closeMenuOnSelect={false}
        isMulti
        options={roles}
        value={roleValue}
        defaultValue={tags.map((t: string) => ({ value: t, label: t }))}
        styles={customStyles}
      />
    </div>
  )
}

export default TagSelector
