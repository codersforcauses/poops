import { GroupBase, StylesConfig } from 'react-select'

export interface SelectOption<T> {
  label: string
  value: T
}

export const customStyles = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(): StylesConfig<Option, IsMulti, Group> => {
  return {
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
}
