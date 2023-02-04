import { useRouter } from 'next/router'
import { PencilIcon } from '@heroicons/react/24/outline'

import Button from '../UI/button'

interface Props {
  editRoute?: string
}

const NavButtons = ({ editRoute }: Props) => {
  const router = useRouter()

  return (
    <div className='my-4 mx-6 flex h-14 flex-row justify-between'>
      <div className='text-center'>
        <Button
          type='button'
          size='medium'
          onClick={() => {
            router.back()
          }}
        >
          Back
        </Button>
      </div>
      {editRoute !== undefined && (
        <div>
          <PencilIcon
            className='m-auto flex h-7 w-7 cursor-pointer'
            onClick={() => router.push(editRoute)}
          />
        </div>
      )}
    </div>
  )
}

export default NavButtons
