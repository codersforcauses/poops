import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import IncidentCard from '@/components/Admin/incidentcard'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { withAdmin } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import { useIncidents } from '@/hooks/incidents'
import { Incident, Status } from '@/types/types'

const Incidents = () => {
  const { data: incidents } = useIncidents()
  const router = useRouter()

  return (
    <>
      <Header pageTitle='Incidents' />
      <div className='main-style'>
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

        <div className='max-h-screen'>
          {incidents
            ?.filter(
              (incident: Incident) => incident.status === Status.unresolved
            )
            .map((incident: Incident, i: number) => (
              <IncidentCard key={i} {...incident}></IncidentCard>
            ))}
        </div>
      </div>
      <NavBar />
    </>
  )
}

const IncidentsWithProtected = withAdmin(Incidents)

IncidentsWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Incidents'>{page}</Layout>
)

export default IncidentsWithProtected
