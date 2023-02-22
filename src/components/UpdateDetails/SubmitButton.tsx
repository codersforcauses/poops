import { useEffect, useState } from 'react'
import Link from 'next/link'
import { isValidPhoneNumber } from 'react-phone-number-input'
export interface SubmitButtonInterface {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  buttonlabel: string
  style: string
  name: string
  email: string
  phoneNum: string
}

const SubmitButton = ({
  onClick,
  buttonlabel,
  style,
  name,
  email,
  phoneNum
}: SubmitButtonInterface) => {
  const isEmpty = !name || !email || !phoneNum
  const [valid, setValid] = useState(false)

  useEffect(() => {
    if (isValidPhoneNumber('+61' + phoneNum)) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [phoneNum])

  return (
    <button className={style} onClick={onClick} disabled={isEmpty}>
      <div className='relative flex items-center space-x-4'>
        {!isEmpty && valid ? (
          <span className='block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
            <Link href='/'>{buttonlabel}</Link>
          </span>
        ) : (
          <span className='block w-max text-sm font-semibold tracking-wide transition duration-300 sm:text-base'>
            {buttonlabel}
          </span>
        )}
      </div>
    </button>
  )
}

export default SubmitButton
