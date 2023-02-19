import { XCircleIcon } from '@heroicons/react/24/outline'

import { useIncidents } from '@/hooks/incidents'
import { useVetConcerns } from '@/hooks/vetconcerns'
import { Incident, VetConcern } from '@/types/types'

import ReportInstance from './reportinstance'

interface ReportListProps {
  searchQuery: string
  visitId: string
}

export const ReportList = (props: ReportListProps) => {
  const [incidentsData, vetConcernsData] = [
    useIncidents(props.visitId),
    useVetConcerns(props.visitId)
  ]
  const reports = [
    ...(incidentsData?.data || []),
    ...(vetConcernsData?.data || [])
  ]
  console.log(reports)

  const clientNameFilter = (reports: Incident | VetConcern) =>
    reports.clientName.toLowerCase().includes(props.searchQuery.toLowerCase())

  const petNameFilter = (reports: Incident | VetConcern) =>
    reports.petName?.toLowerCase().includes(props.searchQuery.toLowerCase())

  const searchFilter = (reports: Incident | VetConcern) =>
    props.searchQuery === '' ||
    clientNameFilter(reports) ||
    petNameFilter(reports)

  return (
    <div className='m-2 h-full flex-col'>
      {reports && reports.length !== 0 ? (
        reports
          .filter(searchFilter)
          .map((reports) =>
            reports.docId ? (
              <ReportInstance key={reports.docId} {...reports} />
            ) : null
          )
      ) : (
        <div className='flex h-full flex-col items-center justify-center'>
          <XCircleIcon className='h-16 w-16 content-center' />
          <p>It&apos;s empty here. Add a report! This is a report page!!!</p>
        </div>
      )}
    </div>
  )
}

export default ReportList
