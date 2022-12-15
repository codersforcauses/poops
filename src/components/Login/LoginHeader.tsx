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
    <div className='flex flex-col items-center h-full animate-text bg-gradient-to-b from-zinc-300 via-zinc-200 to-zinc-50'>
      <title>{pageTitle}</title>
      <div className='m-10 w-max h-max'>
        <Image
          src='/images/poops-logo-transparent.png'
          width={400}
          height={400}
          alt='POOPS logo'
          className='rounded-full'
        ></Image>
      </div>

      <div className='flex justify-center m-5 text-xl font-bold'>{primaryMessage}</div>
      <div className='flex justify-center m-3 text-x1 font-sans'>{secondaryMessage}</div>

      {children}
    </div>
  )
}

export default LoginHeader
