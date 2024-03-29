/* eslint-disable react/display-name */
import { forwardRef, ReactNode, useContext } from 'react'

import { FieldControlContext } from './fieldcontrol'

interface LabelProps {
  children: ReactNode
  required?: boolean
}

const FieldLabel = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { name, required } = useContext(FieldControlContext)
  return (
    <label htmlFor={name} id={`${name}-label`} ref={ref} className='font-bold'>
      {props.children}
      {(required || props.required) && (
        <>
          <span aria-hidden className='text-primary'>
            *
          </span>
          <i className='sr-only'>required</i>
        </>
      )}
    </label>
  )
})

export default FieldLabel
