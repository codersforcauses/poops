import { GroupBase, StylesConfig } from 'react-select'

import { SelectOption } from '@/types/types'

const customStyles: StylesConfig<
  SelectOption,
  false,
  GroupBase<SelectOption>
> = {
  control: () => ({
    display: 'flex',
    borderRadius: '4px',
    backgroundColor: '#fff',
    borderColor: '#6b7280',
    border: '1px solid #6b7280'
  }),
  input: (provided: Record<string, unknown>) => ({
    ...provided,
    paddingTop: '0.25em',
    paddingBottom: '0.25em',
    color: 'black'
  }),
  placeholder: (provided: Record<string, unknown>) => ({
    // surely nobody will notice that the select arrow and this icon is different
    ...provided,
    color: '#6b7280'
  }),
  dropdownIndicator: () => ({
    display: 'flex',
    transition: '',
    padding: '8px',
    color: '#6b7280'
  }),
  valueContainer: (provided: Record<string, unknown>) => ({
    ...provided,
    border: 'black',
    transition: ''
  }),
  indicatorSeparator: (provided: Record<string, unknown>) => ({
    ...provided,
    visibility: 'hidden'
  })
}

export default customStyles
