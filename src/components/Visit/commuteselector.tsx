import { Dispatch, SetStateAction } from 'react'
import { SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'

import customStyles from './commuteselectorstyles'
import { FormFieldProps } from './formfield'

export interface CommuteMethod {
  label: string
  value: string
}

interface CommuteSelectorProps extends FormFieldProps {
  setCommuteMethod: Dispatch<SetStateAction<string>>
}

const commuteMethods: CommuteMethod[] = [
  { label: 'Bus', value: 'Bus' },
  { label: 'Train', value: 'Train' },
  { label: 'Car', value: 'Car' }
]

const CommuteSelector = (props: CommuteSelectorProps) => {
  const handleChange = (newValue: SingleValue<CommuteMethod>) => {
    // fired when user selects an option or creates an option
    // TODO: add newly created option to the array
    if (newValue === null) return
    props.setCommuteMethod(newValue.value)
  }

  return (
    <div className='flex flex-col p-1'>
      <label htmlFor={props.id} className='font-bold'>
        <span className='text-primary'>{props.isRequired ? '*' : ''}</span>
        {props.label}
      </label>
      <CreatableSelect
        onChange={handleChange}
        options={commuteMethods}
        styles={customStyles}
      />
    </div>
  )
}

export default CommuteSelector
