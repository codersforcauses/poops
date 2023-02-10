import { useRouter } from 'next/router'

import ConcernsCard from '@/components/Admin/concernscard'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import Button from '@/components/UI/button'
import { useVetConcerns } from '@/hooks/vetconcerns'
import { VetConcern } from '@/types/types'

const Output = () => {
  const { data: concerns } = useVetConcerns()
  const router = useRouter()

  return (
    <>
      <Header pageTitle='Concerns' />
      <div className='main-style'>
        <div className='mx-2 mt-2'>
          <Button
            type='button'
            size='medium'
            onClick={() => router.push('/admin')}
            className='fixed top-2 left-2'
          >
            Back
          </Button>

          <h1 className='text-center text-2xl'>Concerns</h1>

          <div className='pt-2'>
            {concerns?.map((concern: VetConcern, i: number) => (
              <ConcernsCard key={i} {...concern}></ConcernsCard>
            ))}
          </div>

          <NavBar />
        </div>
      </div>
    </>
  )
}

export default Output
