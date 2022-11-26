export interface ButtonInterface {
  handler: () => void
  buttonLabel: string
}

const Button = (props: ButtonInterface) => {
  return <button onClick={props.handler}>{props.buttonLabel}</button>
}

export default Button
