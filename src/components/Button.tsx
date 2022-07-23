import React from 'react'

export interface ButtonInterface {
  handler: () => void
  height: string
  width: string
  buttonlabel: string
}

const Button = (props: ButtonInterface) => {
  return (
    <button
      onClick={props.handler}
      style={{
        backgroundColor: ' rgb(206 40 61 )',
        color: 'white',
        borderRadius: '2px',
        height: props.height,
        width: props.width
      }}
    >
      {props.buttonlabel}
    </button>
  )
}
export default Button
