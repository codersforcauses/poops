import { ReactNode } from 'react'

export interface LoginButtonInterface {
  onClick: () => void
  icon: ReactNode
  buttonlabel: string
  style: string
  display: boolean
}

const LoginButton = ({
  onClick,
  icon,
  buttonlabel,
  style,
  display
}: LoginButtonInterface) => {
  if (!display) {
    return null
  }
  return (
    <button className={style} onClick={onClick}>
      <div className='relative flex items-center space-x-4'>
        <div className='w-5'>{icon}</div>
        <span className='block w-max text-sm font-semibold tracking-wide text-gray-700 transition duration-300 sm:text-base'>
          {buttonlabel}
        </span>
      </div>
    </button>
  )
}

export default LoginButton
