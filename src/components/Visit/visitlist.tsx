import { XCircleIcon } from '@heroicons/react/24/outline'

import { useVisits } from '@/hooks/visits'
import { Visit } from '@/types/types'

import VisitInstance from './visitinstance'
import Button from '../UI/button'
import Spinner from '../UI/loadingSpinner'

interface VisitListProps {
  searchQuery: string
}

const VisitList = ({ searchQuery }: VisitListProps) => {
  const {
    data: visits,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useVisits(searchQuery !== '')

  const clientNameFilter = (visit: Visit) =>
    visit.clientName.toLowerCase().includes(searchQuery.toLowerCase())

  const petNameFilter = (visit: Visit) =>
    visit.petNames?.toLowerCase().includes(searchQuery.toLowerCase())

  const searchFilter = (visit: Visit) =>
    searchQuery === '' || clientNameFilter(visit) || petNameFilter(visit)

  if (visits === undefined) return null

  if (visits.pages.at(0)?.length === 0) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <XCircleIcon className='h-16 w-16 content-center' />
        <p>It&apos;s empty here. Add a visit! </p>
      </div>
    )
  }

  return (
    <div className='m-2 h-full flex-col'>
      {visits.pages.flatMap((page) =>
        page
          ?.filter(searchFilter)
          .map((visit) => <VisitInstance key={visit.docId} {...visit} />)
      )}
      {searchQuery === '' && (
        <div className='flex h-20 items-center justify-center'>
          {isFetchingNextPage ? (
            <Spinner style='h-10 w-10 fill-primary-dark text-gray-200' />
          ) : hasNextPage ? (
            <Button onClick={() => fetchNextPage()}>Load More</Button>
          ) : (
            <div className='mt-4 text-sm'>No more visits found...</div>
          )}
        </div>
      )}
    </div>
  )
}

export default VisitList
