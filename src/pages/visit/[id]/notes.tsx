import { useRouter } from 'next/router'

import { withProtected } from '@/components/PrivateRoute'
import Modal from '@/components/UI/modal'
import { useVisits } from '@/hooks/visits'

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
        <p className='whitespace-pre-wrap leading-7'>{visit.notes}</p>
      ) : (
        'Error: no notes found'
      )}
    </Modal>
  )
}

export default withProtected(Notes)
