import { Dispatch, SetStateAction } from 'react'
import Select, { SingleValue } from 'react-select'

import { FormFieldProps } from '@/components/Visit/formfield'
import customStyles from '@/components/Visit/selectorstyles'
import { useFirestore } from '@/context/Firebase/Firestore/context'
import { SelectOption } from '@/types/types'

interface ClientSelectorProps extends FormFieldProps {
  setClient: Dispatch<
    SetStateAction<{
      clientId: string
      clientName: string
    }>
  >
}

const ClientSelector = (props: ClientSelectorProps) => {
  const {
    userDoc: { contacts }
  } = useFirestore()

  const getClientList = () => {
    return contacts.map((contact) => {
      const client: SelectOption = {
        label: contact.clientName,
        value: contact.id
      }
      return client
    })
  }
  const handleChange = (newValue: SingleValue<SelectOption>) => {
    // fired when user selects an option or creates an option
    if (newValue === null) return
    props.setClient({ clientId: newValue.value, clientName: newValue.label })
  }

  const defaultValue: SelectOption = {
    label: props.value || 'Select...',
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
