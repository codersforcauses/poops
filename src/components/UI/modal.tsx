import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ModalProps {
  title: string
  backLink: string
}

const Modal = (props: PropsWithChildren<ModalProps>) => {
  return (
    <div className='space-4 z-50 flex h-full flex-col overflow-auto p-4'>
      {/* Header */}
      <div className='flex justify-between border-b-2 border-primary pb-2'>
        {/* Heading */}
        <h1 className='p-2 text-2xl font-bold'>{props.title}</h1>

        {/* Exit Button */}
        <div className='z-[100] h-10 w-10 rounded-full bg-primary drop-shadow-default'>
          <Link href={props.backLink}>
            <button>
              <XMarkIcon className='h-full w-full text-white' />
            </button>
          </Link>
        </div>
      </div>

      {/* Wrapper */}
      <div className='container mx-auto flex flex-col gap-2 overflow-scroll p-2'>
        {/* Content */}
        {props.children}
      </div>
    </div>
  )
}

export default Modal
