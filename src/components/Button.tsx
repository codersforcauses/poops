import React from 'react'

export interface ButtonInterface {
  handler: () => void
  height: string
  width: string
  buttonlabel: string
  style: string
  color: string
}

const Button = (props: ButtonInterface) => {
  return (
    <button className={props.style} onClick={props.handler}>
      <div className='relative flex items-center space-x-4'>
        <span className='text-gray-700 block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
          {props.buttonlabel}
        </span>
      </div>
    </button>
  )
}
export default Button
