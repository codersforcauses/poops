import { ReactNode } from 'react'
import Link from 'next/link'

export interface SubmitButtonInterface {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  buttonlabel: string
  style: string
}

const SubmitButton = ({
  onClick,
  buttonlabel,
  style, 
}: SubmitButtonInterface) => {
  return (
    <button className={style} onClick={onClick}>
      <div className='relative flex items-center space-x-4'>
        <span className='block w-max text-sm font-semibold tracking-wide text-gray-700 transition duration-300 sm:text-base'>
          <Link href="/">{buttonlabel}</Link>
        </span>
      </div>
    </button>
  )
}

export default SubmitButton
