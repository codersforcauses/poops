import { useRouter } from 'next/router'

import ConcernsCard from '@/components/Admin/concernscard'
import NavBar from '@/components/NavBar'
import Button from '@/components/UI/button'
import { useVetConcerns } from '@/hooks/vetconcerns'
import { VetConcern } from '@/types/types'

const Output = () => {
  const { data: concerns } = useVetConcerns()
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
        <h1 className='m-3 flex-1 text-center text-2xl'>Concerns</h1>

        <div className='flex-1'></div>
      </div>

      {concerns?.map((concern: VetConcern, i: number) => (
        <ConcernsCard key={i} {...concern}></ConcernsCard>
      ))}
      <NavBar />
    </>
  )
}

export default Output