import { Dispatch, SetStateAction } from 'react'
import Select, { SingleValue } from 'react-select'

import { FormFieldProps } from '@/components/Visit/formfield'
import customStyles from '@/components/Visit/selectorstyles'
import { useContacts } from '@/hooks/contacts'
import { SelectOption } from '@/types/types'

interface ClientSelectorProps extends Omit<FormFieldProps, 'value'> {
  value?: SelectOption
  setClient: Dispatch<
    SetStateAction<{
      clientName: string
      petNames: string
    }>
  >
  handleChange(newValue: SingleValue<SelectOption>): void
}

const ClientSelector = (props: ClientSelectorProps) => {
  const { data: contacts } = useContacts()
  if (contacts === undefined) return null

  const getClientList = () => {
    return contacts.map((contact) => {
      const client: SelectOption = {
        label: contact.name,
        value: contact.pets ?? ''
      }
      return client
    })
  }

  return (
    <div className={props.className}>
      <div className='flex flex-col'>
        <label htmlFor={props.id} className='font-bold'>
          <span className='text-primary'>{props.isRequired ? '*' : ''}</span>
          {props.label}
        </label>
        <Select
          onChange={props.handleChange}
          options={getClientList()}
          placeholder={props.placeholder}
          styles={customStyles}
          value={props.value}
          getOptionValue={(option) => option.label}
        />
      </div>
    </div>
  )
}

export default ClientSelector
