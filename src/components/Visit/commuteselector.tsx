import { Dispatch, SetStateAction, useState } from 'react'
import { SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'

import { FormFieldProps } from './formfield'
import customStyles from './selectorstyles'

export interface CommuteMethod {
  label: string
  value: string
}

interface CommuteSelectorProps extends FormFieldProps {
  setCommuteMethod: Dispatch<SetStateAction<string>>
}

const addToLocalStorage = (value: string) => {
  let vals = localStorage.getItem('commuteMethods')?.split(',')
  if (vals === undefined) vals = ['Bus', 'Car', 'Train']
  if (!vals.includes(value)) {
    vals.push(value)
    vals.sort()
    localStorage.setItem('commuteMethods', vals.join(','))
  }
}

const getLocalStorage = () => {
  let store = localStorage.getItem('commuteMethods')?.split(',')
  if (store === undefined) store = ['Bus', 'Car', 'Train']
  return store
}

export const getCommuteMethods = () => {
  const commuteMethods: CommuteMethod[] = []
  if (typeof window !== `undefined`) {
    getLocalStorage().forEach((method) => {
      commuteMethods.push({ label: method, value: method })
    })
  }
  return commuteMethods
}

const CommuteSelector = (props: CommuteSelectorProps) => {
  const [commuteMethods, setCommuteMethods] = useState(getCommuteMethods())
  const handleChange = (newValue: SingleValue<CommuteMethod>) => {
    // fired when user selects an option or creates an option
    if (newValue === null) return
    props.setCommuteMethod(newValue.value)
    addToLocalStorage(newValue.value)
    setCommuteMethods(getCommuteMethods())
  }

  const defaultValue: CommuteMethod = {
    label: props.value || '',
    value: props.value || ''
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
        placeholder={props.placeholder}
        styles={customStyles}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default CommuteSelector
