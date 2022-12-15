import { Dispatch, SetStateAction } from 'react'
import Select, { SingleValue, StylesConfig } from 'react-select'

import {
  customStyles,
  SelectOption
} from '@/components/UI/FormComponents/SelectFields/utils'
import { FormFieldProps } from '@/components/Visit/formfield'
import { useFirestore } from '@/context/Firebase/Firestore/context'

interface ClientSelectorProps extends FormFieldProps {
  setClient: Dispatch<
    SetStateAction<{
      clientName: string
      petNames: string
    }>
  >
}

const ClientSelector = (props: ClientSelectorProps) => {
  const {
    userDoc: { contacts }
  } = useFirestore()

  const getClientList = () => {
    return contacts.map((contact) => {
      const client: SelectOption<string> = {
        label: contact.clientName,
        value: contact.pets
      }
      return client
    })
  }
  const handleChange = (newValue: SingleValue<SelectOption<string>>) => {
    // fired when user selects an option or creates an option
    if (newValue === null) return
    props.setClient({ clientName: newValue.label, petNames: newValue.value })
  }

  const defaultValue: SelectOption<string> = {
    label: props.value || 'Select...',
    value: props.value || ''
  }

  return (
    <div className={props.className}>
      <div className='flex flex-col'>
        <label htmlFor={props.id} className='font-bold'>
          <span className='text-primary'>{props.isRequired ? '*' : ''}</span>
          {props.label}
        </label>
        <Select
          // @ts-expect-error: legacy code
          onChange={handleChange}
          options={getClientList()}
          placeholder={props.placeholder}
          styles={customStyles as StylesConfig}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  )
}

export default ClientSelector
