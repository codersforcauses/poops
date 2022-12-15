import { ReactNode } from 'react'
import Image from 'next/image'

export interface LoginHeaderInterface {
  pageTitle: string // Main Page Title Displayed at top of the page
  primaryMessage: string
  secondaryMessage: string
  children?: ReactNode // The set of buttons or form that the user is to interact with
}

const LoginHeader = ({
  pageTitle,
  primaryMessage,
  secondaryMessage,
  children
}: LoginHeaderInterface) => {
  return (
    <div className='flex h-full animate-text flex-col items-center bg-gradient-to-b from-zinc-300 via-zinc-200 to-zinc-50'>
      <title>{pageTitle}</title>
      <div className='m-10 h-max w-max'>
        <Image
          src='/images/poops-logo-transparent.png'
          width={300}
          height={300}
          alt='POOPS logo'
          className='rounded-full'
        ></Image>
      </div>

      <div className='m-5 flex justify-center text-xl font-bold'>
        {primaryMessage}
      </div>
      <div className='text-x1 m-3 flex justify-center font-sans'>
        {secondaryMessage}
      </div>

      {children}
    </div>
  )
}

export default LoginHeader
