import Link from 'next/link'
import { useRouter } from 'next/router'
import { XIcon } from '@heroicons/react/outline'

import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import { VisitForm } from '@/components/Visit/VisitForm'
import { useFirestore } from '@/context/Firebase/Firestore/context'
import { VisitData } from '@/types/types'

const Set = () => {
  // ! BUG: when reloading this page whilst editing, all the fields are removed. userDoc is undefined?
  const { userDoc, updateVisit } = useFirestore()
  const router = useRouter()
  const i: string | string[] | undefined = router.query.id
  let id: number | null = null
  let visitData: VisitData | null = null
  if (i !== undefined) {
    id = parseInt(i + '')
    visitData = userDoc.visits[id]
  }

  const handleDelete = () => {
    userDoc.visits.splice(Number(id), 1) // update visit locally
    updateVisit?.(userDoc) // send updated visit list to firestore
    router.push('/visit')
  }

  return (
    <div className='space-4 z-50 flex h-full flex-col p-4'>
      {/* Exit Button */}
      <div className='fixed right-5 top-4 z-[100] h-10 w-10 rounded-full bg-primary drop-shadow-default'>
        <Link href='/visit'>
          <button>
            <XIcon className='h-full w-full text-white' />
          </button>
        </Link>
      </div>

      {/* Heading */}
      <>
        <h1 className='p-2 text-2xl font-bold'>
          {id !== null ? 'Edit' : 'Add'} Your Visit
        </h1>
        <div className='my-2 box-content border-t-2 border-primary' />
      </>

      {/* Wrapper */}
      <div className='container mx-auto flex flex-col gap-2 p-2'>
        {/* Form */}
        <VisitForm id={id} visitData={visitData} />

        <Button
          className='col-span-2'
          intent='secondary'
          fullwidth
          onClick={handleDelete}
          hidden={id === null} // button should be hidden if no id
        >
          Remove This Visit
        </Button>

        <Button intent='primary' size='medium' hidden={id === null} fullwidth>
          Report
          <br />
          Incident
        </Button>

        <Button intent='primary' size='medium' hidden={id === null} fullwidth>
          Register Vet
          <br />
          Concern
        </Button>
      </div>
    </div>
  )
}

export default withProtected(Set)
