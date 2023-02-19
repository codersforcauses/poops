import { useRouter } from 'next/router'

import { withProtected } from '@/components/PrivateRoute'
import Modal from '@/components/UI/modal'
import { VisitForm } from '@/components/Visit/VisitForm'
import { useVisits } from '@/hooks/visits'

const Set = () => {
  const { data: visitData } = useVisits()

  const router = useRouter()
  const { id: queryId } = router.query

  const visits = visitData?.pages?.flatMap((p) => p)
  const visitId =
    queryId === undefined || Array.isArray(queryId) ? null : queryId
  const visit = visits?.find((visit) => queryId && visit?.docId === visitId)

  const isNewVisit = visit === undefined || visit.docId === null

  return (
    <Modal
      title={`${isNewVisit ? 'Add' : 'Edit'} Your Visit`}
      backLink='/visit'
    >
      <VisitForm visitData={visit} />
    </Modal>
  )
}

export default withProtected(Set)