import Link from 'next/link'
import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { withProtected } from '@/components/PrivateRoute'
import { VisitForm } from '@/components/Visit/VisitForm'
import { useVisits } from '@/hooks/visits'

const Set = () => {
  const { data: visits } = useVisits()

  const router = useRouter()
  const { id: queryId } = router.query
  const visitId =
    queryId === undefined || Array.isArray(queryId) ? null : queryId
  const visit = visits?.find((visit) => queryId && visit.docId === visitId)

  const isNewVisit = visit === undefined || visit.docId === null

  return (
    /* Container */
    <div className='space-4 z-50 flex h-full flex-col overflow-auto p-4'>
      {/* Header */}
      <div className='flex justify-between border-b-2 border-primary pb-2'>
        {/* Heading */}
        <h1 className='p-2 text-2xl font-bold'>
          {isNewVisit ? 'Add' : 'Edit'} Your Visit
        </h1>

        {/* Exit Button */}
        <div className='z-[100] h-10 w-10 rounded-full bg-primary drop-shadow-default'>
          <Link href='/visit'>
            <button>
              <XMarkIcon className='h-full w-full text-white' />
            </button>
          </Link>
        </div>
      </div>

      {/* Wrapper */}
      <div className='container mx-auto flex flex-col gap-2 p-2'>
        {/* Form */}
        <VisitForm visitData={visit} />
      </div>
    </div>
  )
}

export default withProtected(Set)
