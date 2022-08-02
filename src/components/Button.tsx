import React from 'react'

export interface ButtonInterface {
  handler: () => void
  buttonlabel: string
}

const Button = (props: ButtonInterface) => {
  return (
    <button
      className='w-fit rounded-lg bg-primary py-1 px-4 text-lg text-white shadow-md focus:outline-primary active:bg-dark-red'
      onClick={props.handler}
    >
      {props.buttonlabel}
    </button>
  )
}
export default Button
