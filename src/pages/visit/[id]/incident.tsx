import { useRouter } from 'next/router'

import { withProtected } from '@/components/PrivateRoute'
import Modal from '@/components/UI/modal'
import IncidentForm from '@/components/Visit/IncidentForm'
import { useVisits } from '@/hooks/visits'

const Incident = () => {
  const { data: visits } = useVisits()
  const router = useRouter()

  const { id: queryId } = router.query
  const visitId =
    queryId === undefined || Array.isArray(queryId) ? null : queryId
  const visit = visits?.find((visit) => queryId && visit.docId === visitId)

  return (
    <Modal title='Add Your Incident' backLink='/visit'>
      {visit ? (
        <IncidentForm
          docId={visitId || ''}
          clientName={visit?.clientName}
          pets={visit?.petNames}
          visitTime={visit?.startTime}
        />
      ) : (
        'Error: Visit not found'
      )}
    </Modal>
  )
}

export default withProtected(Incident)
