import { ReactElement } from 'react'

import Layout from '@/components/Layout'
import { withProtected } from '@/components/PrivateRoute'
import Spinner from '@/components/UI/loadingSpinner'
import { AddButton, SearchButton } from '@/components/Visit/buttons'
import VisitList from '@/components/Visit/visitlist'
import { useVisits } from '@/hooks/visits'
import { NextPageWithLayout } from '@/pages/_app'

const Visit: NextPageWithLayout = () => {
  const { isLoading } = useVisits()

  return (
    <div className='main-style'>
      <div className='flex w-screen flex-col p-4'>
        {isLoading ? (
          <div className='flex h-20 items-center justify-center'>
            <Spinner style='h-10 w-10 fill-primary-dark text-gray-200' />
          </div>
        ) : (
          <VisitList />
        )}
      </div>
      <div className='absolute bottom-20 right-2 space-y-2'>
        <AddButton />
        <SearchButton />
      </div>
    </div>
  )
}

const VisitWithProtected = withProtected(Visit)

VisitWithProtected.getLayout = (page: ReactElement) => (
  <Layout title='Visit'>{page}</Layout>
)

export default VisitWithProtected
