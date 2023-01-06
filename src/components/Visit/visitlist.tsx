import { XCircleIcon } from '@heroicons/react/24/outline'

import { useVisits } from '@/hooks/visits'
import { Visit } from '@/types/types'

import VisitInstance from './visitinstance'

interface VisitListProps {
  searchQuery: string
}

export const VisitList = (props: VisitListProps) => {
  const { data: visits } = useVisits()

  const clientNameFilter = (visit: Visit) =>
    visit.clientName.toLowerCase().includes(props.searchQuery.toLowerCase())

  const petNameFilter = (visit: Visit) =>
    visit.petNames?.toLowerCase().includes(props.searchQuery.toLowerCase())

  const searchFilter = (visit: Visit) =>
    props.searchQuery === '' || clientNameFilter(visit) || petNameFilter(visit)

  return (
    <div className='m-2 h-full flex-col'>
      {visits && visits.length !== 0 ? (
        visits
          .filter(searchFilter)
          .map((visit: any) =>
            visit.docId ? <VisitInstance key={visit.docId} {...visit} /> : null
          )
      ) : (
        <div className='flex h-full flex-col items-center justify-center'>
          <XCircleIcon className='h-16 w-16 content-center' />
          <p>It&apos;s empty here. Add a visit! </p>
        </div>
      )}
    </div>
  )
}

export default VisitList
