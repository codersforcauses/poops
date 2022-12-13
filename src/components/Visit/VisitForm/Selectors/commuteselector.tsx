import { Dispatch, SetStateAction, useState } from 'react'
import { SingleValue, StylesConfig } from 'react-select'
import CreatableSelect from 'react-select/creatable'

import {
  customStyles,
  SelectOption
} from '@/components/UI/FormComponents/SelectFields/utils'
import { FormFieldProps } from '@/components/Visit/formfield'

interface CommuteSelectorProps extends FormFieldProps {
  setCommuteMethod: Dispatch<SetStateAction<string>>
}

const defaultCommuteMethods = ['Bus', 'Car', 'Train']

const addToLocalStorage = (value: string) => {
  let vals = localStorage.getItem('commuteMethods')?.split(',')
  if (vals === undefined) vals = defaultCommuteMethods
  if (!vals.includes(value)) {
    vals.push(value)
    vals.sort()
    localStorage.setItem('commuteMethods', vals.join(','))
  }
}

const getLocalStorage = () => {
  let store = localStorage.getItem('commuteMethods')?.split(',')
  if (store === undefined) store = defaultCommuteMethods
  return store
}

export const getCommuteMethods = () => {
  const commuteMethods: SelectOption<string>[] = []
  if (typeof window !== 'undefined') {
    getLocalStorage().forEach((method) => {
      commuteMethods.push({ label: method, value: method })
    })
  }
  return commuteMethods
}

const CommuteSelector = (props: CommuteSelectorProps) => {
  const [commuteMethods, setCommuteMethods] = useState(getCommuteMethods())
  const handleChange = (newValue: SingleValue<SelectOption<string>>) => {
    // fired when user selects an option or creates an option
    if (newValue === null) return
    props.setCommuteMethod(newValue.value)
    addToLocalStorage(newValue.value)
    setCommuteMethods(getCommuteMethods())
  }

  const defaultValue: SelectOption<string> = {
    label: props.value || 'Select...',
    value: props.value || ''
  }

  return (
    <div className='flex flex-col'>
      <label htmlFor={props.id} className='font-bold'>
        <span className='text-primary'>{props.isRequired ? '*' : ''}</span>
        {props.label}
      </label>
      <CreatableSelect
        // @ts-expect-error: legacy code
        onChange={handleChange}
        options={commuteMethods}
        placeholder={props.placeholder}
        styles={customStyles as StylesConfig}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default CommuteSelector
