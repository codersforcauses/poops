import { ReactNode } from 'react'

export interface LoginButtonInterface {
  handler: () => void
  icon: ReactNode
  buttonlabel: string
  style: string
  display: boolean
}

const LoginButton = (props: LoginButtonInterface) => {
  if (!props.display) {
    return null
  }
  return (
    <button className={props.style} onClick={props.handler}>
      <div className='relative flex items-center space-x-4'>
        <div className='w-5'>{props.icon}</div>
        <span className='block w-max text-sm font-semibold tracking-wide text-gray-700 transition duration-300 sm:text-base'>
          {props.buttonlabel}
        </span>
      </div>
    </button>
  )
}

export default LoginButton
