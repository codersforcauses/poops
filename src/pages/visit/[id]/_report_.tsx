import { XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export const Report = () => {
  return (
    <div className='flex max-h-screen flex-col overflow-y-auto p-4'>
      <div className='flex flex-col items-center justify-center'>
        <Link href='/visit'>
          <button className='flex flex-col items-center justify-center'>
            <XCircleIcon className='h-16 w-16' />
            <p>It&apos;s empty here. Add an Incident or Vet concern! </p>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Report
