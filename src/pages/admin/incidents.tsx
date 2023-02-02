import { useRouter } from 'next/router'

import IncidentCard from '@/components/Admin/incidentcard'
import NavBar from '@/components/NavBar'
import Button from '@/components/UI/button'
import { useIncidents } from '@/hooks/incidents'
import { Incident } from '@/types/types'

const AdminIncidents = () => {
  const { data: incidents } = useIncidents()
  const router = useRouter()

  return (
    <>
      <div className='m-auto flex h-14 w-full flex-row'>
        <div className='m-auto flex-1 text-center'>
          <Button
            type='button'
            size='medium'
            onClick={() => router.push('/admin')}
          >
            Back
          </Button>
        </div>
        <h1 className='m-3 flex-1 text-center text-2xl'>Incidents</h1>

        <div className='flex-1'></div>
      </div>

      {incidents?.map((incident: Incident, i: number) => (
        <IncidentCard key={i} {...incident}></IncidentCard>
      ))}
      <NavBar />
    </>
  )
}

export default AdminIncidents
