import { Dispatch, SetStateAction, useState } from 'react'
import { SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'

import { SelectOption } from '@/types/types'

import { FormFieldProps } from './formfield'
import customStyles from './selectorstyles'

interface CommuteSelectorProps extends Omit<FormFieldProps, 'value'> {
  value?: SelectOption
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
  const commuteMethods: SelectOption[] = []
  if (typeof window !== 'undefined') {
    getLocalStorage().forEach((method) => {
      commuteMethods.push({ label: method, value: method })
    })
  }
  return commuteMethods
}

const CommuteSelector = (props: CommuteSelectorProps) => {
  const [commuteMethods, setCommuteMethods] = useState(getCommuteMethods())
  const handleChange = (newValue: SingleValue<SelectOption>) => {
    // fired when user selects an option or creates an option
    if (newValue === null) return
    props.setCommuteMethod(newValue.value)
    addToLocalStorage(newValue.value)
    setCommuteMethods(getCommuteMethods())
  }

  return (
    <div className='flex flex-col'>
      <label htmlFor={props.id} className='font-bold'>
        <span className='text-primary'>{props.isRequired ? '*' : ''}</span>
        {props.label}
      </label>
      <CreatableSelect
        id={props.id}
        onChange={handleChange}
        options={commuteMethods}
        placeholder={props.placeholder}
        styles={customStyles}
        value={props.value}
      />
    </div>
  )
}

export default CommuteSelector
