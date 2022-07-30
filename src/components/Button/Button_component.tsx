import React from 'react'
import { ReactNode } from 'react'
export interface ButtonInterface {
  handler?: () => void
  buttonlabel?: string
  attribute?: string
  buttontype?: 'button' | 'submit' | 'reset' | undefined
  icon?: ReactNode
  style?: string
  display?: boolean
  disabled_function?: any
}

const Button = (props: ButtonInterface) => {
  return (
    <button
      className={props.attribute}
      type={props.buttontype}
      onClick={props.handler}
      disabled={props.disabled_function}
    >
      {props.buttonlabel ? props.buttonlabel : props.icon}
    </button>
  )
}
export default Button
