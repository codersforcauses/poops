import { useRouter } from 'next/router'

import ConcernsCard from '@/components/Admin/concernscard'
import NavBar from '@/components/NavBar'
import Button from '@/components/UI/button'
import { useVetConcerns } from '@/hooks/vetconcerns'
import { VetConcern } from '@/types/types'

/* import { useConcerns } from '@/hooks/concerns' */

/* Dummy Data */
/* const uid = '123456'
const uname = 'Quokka'
const uemail = 'Quokka@rottnest.com'
const uphone = 999888777
const cname = 'Koala'
const pname = 'Pet'
const vtime = '[timestamp to be added]'
const vid = '123456'
const detail = 'Pet was hurt!'
const ctime = '[timestamp to be added]' */

const Output = () => {
  /* const { data: concerns } = useConcerns() */
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
    // <div className='space-4 z-50 flex h-full flex-col p-4'>
    //   {/* Exit Button */}
    //   <div className='fixed right-5 top-4 z-[100] h-10 w-10 rounded-full bg-primary drop-shadow-default'>
    //     <Link href='/admin'>
    //       <button>
    //         <XMarkIcon className='h-full w-full text-white' />
    //       </button>
    //     </Link>
    //   </div>

    //   {/* Heading */}
    //   <h1 className='p-2 text-2xl font-bold'>Concerns</h1>
    //   <div className='my-2 box-content border-t-2 border-primary' />

    //   {/* Content */}
    //   <div className='grid'>
    //     {/* <h1 class='p-2'>user_uid: {uid}</h1>
    //     <h1 class='p-2'>user_name: {uname}</h1>
    //     <h1 class='p-2'>user_email: {uemail}</h1>
    //     <h1 class='p-2'>user_phone: {uphone}</h1>
    //     <h1 class='p-2'>client_name: {cname}</h1>
    //     <h1 class='p-2'>pet_name: {pname}</h1>
    //     <h1 class='p-2'>visit_time: {vtime}</h1>
    //     <h1 class='p-2'>visit_id: {vid}</h1>
    //     <h1 class='p-2'>detail: {detail}</h1>
    //     <h1 class='p-2'>created_at: {ctime}</h1> */}

    //     {/* {concerns?.map((concern: Concern, i: number) => (
    //     <ConcernsCard key={i} {...concern}></ConcernsCard>
    //   ))} */}
    //   </div>

    //   <NavBar />
    // </div>
  )
}

export default Output
