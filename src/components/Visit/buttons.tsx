import Link from 'next/link'
import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid'

interface EditButtonProps {
  id: string
}

export const EditButton = ({ id }: EditButtonProps) => {
  return (
    <div className='absolute right-4 bottom-4 h-8 w-8 rounded-full bg-primary p-1 drop-shadow-default transition-all'>
      <Link href={`/visit/${id}`}>
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
        <button type='button' data-cy='add-visit'>
          <PlusIcon className='flex h-full w-full self-center text-white' />
        </button>
      </Link>
    </div>
  )
}
