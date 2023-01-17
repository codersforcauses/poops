import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { withProtected } from '@/components/PrivateRoute'

const Concern = () => {
  return (
    <div className='space-4 z-50 flex h-full flex-col p-4'>
      {/* Exit Button */}
      <div className='fixed right-5 top-4 z-[100] h-10 w-10 rounded-full bg-primary drop-shadow-default'>
        <Link href='/admin'>
          <button>
            <XMarkIcon className='h-full w-full text-white' />
          </button>
        </Link>
      </div>

      {/* Heading */}
      <h1 className='p-2 text-2xl font-bold'>Concern</h1>
      <div className='my-2 box-content border-t-2 border-primary' />

      {/* Content */}
      <div className='grid'>
        <h1 class='p-2'>user_uid: string</h1>
        <h1 class='p-2'>user_name: string</h1>
        <h1 class='p-2'>user_email: string</h1>
        <h1 class='p-2'>user_phone: integer</h1>
        <h1 class='p-2'>client_name: string</h1>
        <h1 class='p-2'>pet_name: string</h1>
        <h1 class='p-2'>visit_time: timestamp</h1>
        <h1 class='p-2'>visit_id: string</h1>
        <h1 class='p-2'>detail: string</h1>
        <h1 class='p-2'>created_at: timestamp</h1>
      </div>
    </div>
  )
}

export default withProtected(Concern)
