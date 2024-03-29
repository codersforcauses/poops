import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import ConcernsCard from '@/components/Admin/concernscard'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { withAdmin } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import { useVetConcerns } from '@/hooks/vetconcerns'
import { Status, VetConcern } from '@/types/types'

const VetConcerns = () => {
  const { data: concerns } = useVetConcerns()
  const router = useRouter()

  return (
    <>
      <Header pageTitle='Concerns' />
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
          <h1 className='m-3 flex-1 text-center text-2xl'>Concerns</h1>
          <div className='flex-1'></div>
        </div>

        <div className='max-h-screen'>
          {concerns
            ?.filter(
              (concern: VetConcern) => concern.status === Status.unresolved
            )
            .map((concern: VetConcern, i: number) => (
              <ConcernsCard key={i} {...concern}></ConcernsCard>
            ))}
        </div>
      </div>
      <NavBar />
    </>
  )
}

const VetConcernsWithProtected = withAdmin(VetConcerns)

VetConcernsWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Vet Concerns'>{page}</Layout>
)

export default VetConcernsWithProtected
