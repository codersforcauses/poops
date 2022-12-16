import Link from 'next/link'
import { PencilIcon, PlusIcon } from '@heroicons/react/solid'

interface EditButtonProps {
  id: number
}

export const EditButton = ({ id }: EditButtonProps) => {
  return (
    <div className='invisible absolute right-4 bottom-1 h-8 w-8 rounded-full bg-primary p-1 drop-shadow-default transition-all peer-checked:visible'>
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
