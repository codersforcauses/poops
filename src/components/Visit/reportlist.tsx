import { XCircleIcon } from '@heroicons/react/24/outline'

import { useIncidents } from '@/hooks/incidents'
import { Incident } from '@/types/types'

import ReportInstance from './reportinstance'

interface ReportListProps {
  searchQuery: string
  visitId: string
}

const visitId = 'nWZ4FWWjBZMkhtzTYNAW'

export const ReportList = (props: ReportListProps) => {
  const { data: incidents } = useIncidents(visitId)

  const clientNameFilter = (report: Incident) =>
    report.clientName.toLowerCase().includes(props.searchQuery.toLowerCase())

  const petNameFilter = (report: Incident) =>
    report.petName?.toLowerCase().includes(props.searchQuery.toLowerCase())

  const searchFilter = (report: Incident) =>
    props.searchQuery === '' || clientNameFilter(report) || petNameFilter(report)

  return (
    <div className='m-2 h-full flex-col'>
      {incidents && incidents.length !== 0 ? (
        incidents
          .filter(searchFilter)
          .map((report) =>
            report.docId ? <ReportInstance key={report.docId} {...report} /> : null
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
