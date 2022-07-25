import { Dispatch, SetStateAction } from 'react'
import Select, { SingleValue } from 'react-select'

import { FormFieldProps } from '@/components/Visit/formfield'
import customStyles from '@/components/Visit/selectorstyles'
import { useFirestore } from '@/context/firestore'

interface ClientSelectorProps extends FormFieldProps {
  setClientName: Dispatch<SetStateAction<string>>
}

interface ClientName {
  // combine with CommuteMethod
  label: string
  value: string
}

const ClientSelector = (props: ClientSelectorProps) => {
  const {
    userDoc: { contacts }
  } = useFirestore()

  const getClientList = () => {
    return contacts.map((contact) => {
      const clientName: ClientName = {
        label: contact.displayName,
        value: contact.id
      }
      return clientName
    })
  }
  const handleChange = (newValue: SingleValue<ClientName>) => {
    // fired when user selects an option or creates an option
    if (newValue === null) return
    props.setClientName(newValue.value)
  }

  const defaultValue: ClientName = {
    label: props.value || '',
    value: props.value || ''
  }

  return (
    <div className='flex flex-col p-1'>
      <label htmlFor={props.id} className='font-bold'>
        <span className='text-primary'>{props.isRequired ? '*' : ''}</span>
        {props.label}
      </label>
      <Select
        onChange={handleChange}
        options={getClientList()}
        placeholder={props.placeholder}
        styles={customStyles}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default ClientSelector
