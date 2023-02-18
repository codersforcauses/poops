import { PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren {
  title: string
  fullWidth?: boolean
}

const Card = ({ title, fullWidth, ...props }: CardProps) => {
  return (
    <div className='container flex justify-center self-center'>
      <div
        className={`rounded-lg bg-zinc-100 py-4 px-5 text-center shadow-lg sm:py-4 ${
          fullWidth ? 'w-full' : 'null'
        }`}
      >
        <h1 className='mb-2 text-xl text-primary-dark'>
          <b>{title}</b>
        </h1>
        <hr className='h-0.5 border-primary-dark bg-primary-dark text-primary-dark' />
        <div className='flex items-center justify-center self-center'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Card
