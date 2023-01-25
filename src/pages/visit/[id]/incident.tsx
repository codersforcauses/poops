import Link from 'next/link'
import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/solid'

import { withProtected } from '@/components/PrivateRoute'
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
    <div className='z-50 p-4'>
      <>
        <div className='fixed right-5 top-4 z-[100] h-10 w-10 rounded-full bg-primary p-1 drop-shadow-default'>
          <Link href='/visit'>
            <button>
              <XMarkIcon className='h-full w-full text-white' />
            </button>
          </Link>
        </div>

        <div className='border-b-2 border-primary py-3 pt-10'>
          <h1 className='pl-2 text-2xl font-bold'>Add Your Incident</h1>
        </div>

        <IncidentForm docId={docId} clientName={clientName} pets={pets} />
      </>
    </div>
  )
}

export default withProtected(Incident)
