import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid'

interface EditButtonProps {
  id: string
}

export const EditButton = ({ id }: EditButtonProps) => (
  <div className='h-10 w-10 rounded-full bg-primary p-1 drop-shadow-default'>
    <Link href={`/visit/${id}`}>
      <button type='button'>
        <PencilIcon className='h-full w-full p-1 text-white' />
      </button>
    </Link>
  </div>
)

export const AddButton = () => (
  <div className='h-12 w-12 rounded-full bg-primary p-1 drop-shadow-default'>
    <Link href='/visit/set'>
      <button type='button'>
        <PlusIcon className='h-full w-full text-white' />
      </button>
    </Link>
  </div>
)

export const SearchButton = () => (
  <div className='h-12 w-12 rounded-full bg-primary p-1 drop-shadow-default'>
    <Link href='/visit/search'>
      <button type='button'>
        <MagnifyingGlassIcon className='h-full w-full text-white' />
      </button>
    </Link>
  </div>
)
