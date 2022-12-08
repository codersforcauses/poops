import { ReactNode } from 'react'
import Image from 'next/image'

export interface LoginHeaderInterface {
  pageTitle: string
  primaryMessage: string
  secondaryMessage: string
  children?: ReactNode
}

const LoginHeader = ({
  pageTitle,
  primaryMessage,
  secondaryMessage,
  children
}: LoginHeaderInterface) => {
  return (
    <div>
      <title>{pageTitle}</title>
      <div className='animate-text bg-gradient-to-b from-zinc-300 via-zinc-200 to-zinc-50 '>
        <div className='m-auto max-w-sm p-10'>
          <Image
            src='/images/poops-logo-transparent.png'
            width={36}
            height={36}
            layout='responsive'
            alt='POOPS logo'
            className='rounded-full'
          ></Image>
        </div>
      </div>

      <div className='p-3 text-center text-xl font-bold'>{primaryMessage}</div>
      <div className='text-x1 text-center font-sans'>{secondaryMessage}</div>

      {children}
    </div>
  )
}

export default LoginHeader
