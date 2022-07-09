import { Dispatch, SetStateAction, useState } from 'react'
import Creatable from 'react-select/creatable'
import { StylesConfig } from 'react-select'

const roles = [
  { value: 'Volunteer', label: 'Volunteer' },
  { value: 'Client', label: 'Client' },
  { value: 'Coordinator', label: 'Coordinator' }
]

type MultiValueProp = {
  value: string
  label: string
}

const customStyles: StylesConfig<MultiValueProp> = {
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
  tags: Array<string>
  setTags: Dispatch<SetStateAction<Array<string>>>
}

const TagSelector = ({ tags, setTags }: Props) => {
  const [roleValue, setRoleValue] = useState(
    tags.map((t: string) => ({ value: t, label: t }))
  )

  const handleChange = (field: string, value: []) => {
    switch (field) {
      case 'roles':
        setRoleValue(value)
        setTags(value.map((val) => val['value']))
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
