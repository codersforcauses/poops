import Link from 'next/link'
import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid'

interface EditButtonProps {
  id: string
}

export const EditButton = ({ id }: EditButtonProps) => {
  return (
    <div className='h-10 w-10 rounded-full bg-primary p-1.5 drop-shadow-default transition-all'>
      <Link
        href={{
          pathname: '/visit/set',
          query: {
            id: id
          }
        }}
      >
        <button type='button'>
          <PencilIcon className='h-full w-full text-white' />
        </button>
      </Link>
    </div>
  )
}

export const AddButton = () => {
  return (
    <div className='align-center flex h-10 w-10 place-items-center self-center rounded-full bg-primary p-1 drop-shadow-default'>
      <Link href='/visit/set'>
        <button type='button'>
          <PlusIcon className='flex h-full w-full self-center text-white' />
        </button>
      </Link>
    </div>
  )
}
