import { useRouter } from 'next/router'

import { withProtected } from '@/components/PrivateRoute'
import Modal from '@/components/UI/modal'
import IncidentForm from '@/components/Visit/IncidentForm'

const Incident = () => {
  // ! unsafe to store client names and pets in query
  const router = useRouter()
  let { pets } = router.query
  const { client, visitId } = router.query

  if (pets === undefined) pets = ''
  if (Array.isArray(pets)) pets = pets.length > 0 ? pets[0] : ''

  let clientName = ''
  if (Array.isArray(client)) clientName = client.length > 0 ? client[0] : ''
  else if (client) clientName = client

  let docId = ''
  if (Array.isArray(visitId)) docId = visitId.length > 0 ? visitId[0] : ''
  else if (visitId) docId = visitId

  return (
    <Modal title='Add Your Incident' backLink='/visit'>
      <IncidentForm docId={docId} clientName={clientName} pets={pets} />
    </Modal>
  )
}

export default withProtected(Incident)
