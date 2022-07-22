import { GroupBase, StylesConfig } from 'react-select'

type OptionType = {
  label: string
  value: string
}

const singleStyles: StylesConfig<OptionType, true, GroupBase<OptionType>> = {
  control: () => ({
    marginTop: '4px',
    marginBottom: '8px',
    display: 'flex',
    borderRadius: '4px',
    backgroundColor: '#fff',
    borderColor: '#6b7280',
    border: '1px solid #6b7280'
  }),
  input: (provided) => ({
    ...provided,
    paddingTop: '0.1em',
    paddingBottom: '0.1em',
    color: 'black'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#6b7280'
  }),
  dropdownIndicator: () => ({
    display: 'flex',
    transition: '',
    padding: '8px',
    color: '#6b7280'
  }),
  valueContainer: (provided) => ({
    ...provided,
    border: 'black',
    transition: ''
  })
}

export default singleStyles
