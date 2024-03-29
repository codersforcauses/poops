import { useRouter } from 'next/router'

import { withProtected } from '@/components/PrivateRoute'
import Modal from '@/components/UI/modal'
import VetForm from '@/components/Visit/VetForm'
import { useVisits } from '@/hooks/visits'

const Vet = () => {
  // getting specific visit info
  const { data: visits } = useVisits(false)
  const router = useRouter()
  const { id: queryId } = router.query
  const visitId =
    queryId === undefined || Array.isArray(queryId) ? null : queryId
  const visit = visits?.pages
    .flatMap((page) => page)
    .find((visit) => queryId && visit?.docId === visitId)

  return (
    <Modal title='Register a Vet Concern' backLink='/visit'>
      {visit ? (
        <VetForm
          docId={visitId || ''}
          clientName={visit.clientName}
          pets={visit.petNames}
          visitTime={visit.startTime}
        />
      ) : (
        'Error: Visit not found'
      )}
    </Modal>
  )
}

export default withProtected(Vet)
