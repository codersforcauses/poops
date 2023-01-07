import Link from 'next/link'
import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { withProtected } from '@/components/PrivateRoute'
import { VisitForm } from '@/components/Visit/VisitForm'
import { useVisits } from '@/hooks/visits'

const Set = () => {
  const { data: visits } = useVisits()

  const router = useRouter()
  const queryId = router.query.id
  const visitId =
    queryId === undefined || Array.isArray(queryId) ? null : queryId
  const visit = visits?.find((visit) => queryId && visit.docId === visitId)
  const isNewVisit = visit === undefined || visit.docId === null

  return (
    <div className='space-4 z-50 flex h-full flex-col p-4'>
      {/* Exit Button */}
      <div className='fixed right-5 top-4 z-[100] h-10 w-10 rounded-full bg-primary drop-shadow-default'>
        <Link href='/visit'>
          <button>
            <XMarkIcon className='h-full w-full text-white' />
          </button>
        </Link>
      </div>

      {/* Heading */}
      <>
        <h1 className='p-2 text-2xl font-bold'>
          {isNewVisit ? 'Add' : 'Edit'} Your Visit
        </h1>
        <div className='my-2 box-content border-t-2 border-primary' />
      </>

      {/* Wrapper */}
      <div className='container mx-auto flex flex-col gap-2 p-2'>
        {/* Form */}
        <VisitForm visitData={visit} />
      </div>
    </div>
  )
}

export default withProtected(Set)
