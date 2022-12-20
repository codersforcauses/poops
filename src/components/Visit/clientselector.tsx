import { Dispatch, SetStateAction } from 'react'
import Select, { SingleValue } from 'react-select'

import { FormFieldProps } from '@/components/Visit/formfield'
import customStyles from '@/components/Visit/selectorstyles'
import { useFirestore } from '@/context/Firebase/Firestore/context'
import { SelectOption } from '@/types/types'

interface ClientSelectorProps extends Omit<FormFieldProps, 'value'> {
  value?: SelectOption
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
      const client: SelectOption = {
        label: contact.clientName,
        value: contact.pets
      }
      return client
    })
  }
  const handleChange = (newValue: SingleValue<SelectOption>) => {
    // fired when user selects an option or creates an option
    if (newValue === null) return
    props.setClient({ clientName: newValue.label, petNames: newValue.value })
  }

  return (
    <div className={props.className}>
      <div className='flex flex-col'>
        <label htmlFor={props.id} className='font-bold'>
          <span className='text-primary'>{props.isRequired ? '*' : ''}</span>
          {props.label}
        </label>
        <Select
          onChange={handleChange}
          options={getClientList()}
          placeholder={props.placeholder}
          styles={customStyles}
          value={props.value}
        />
      </div>
    </div>
  )
}

export default ClientSelector
