import { useRouter } from 'next/router'

import { withProtected } from '@/components/PrivateRoute'
import Modal from '@/components/UI/modal'
import { useVisits } from '@/hooks/visits'
import { humanizeTimestamp } from '@/utils'

const Notes = () => {
  const { data: visits } = useVisits()
  const router = useRouter()

  const { id: queryId } = router.query
  const visitId =
    queryId === undefined || Array.isArray(queryId) ? null : queryId
  const visit = visits?.find((visit) => queryId && visit.docId === visitId)

  return (
    <Modal title='Notes' backLink='/visit'>
      {visit ? (
        <div>
          <div className='font-bold'>
            <p className='text-primary'>{humanizeTimestamp(visit.startTime)}</p>
            <p>{visit.clientName}</p>
          </div>
          <p className='whitespace-pre-wrap text-sm leading-6'>{visit.notes}</p>
        </div>
      ) : (
        'Error: no notes found'
      )}
    </Modal>
  )
}

export default withProtected(Notes)
