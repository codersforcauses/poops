import Header from '@/components/Header'
import { AddButton } from '@/components/visit/buttons'
import VisitsSearchBar from '@/components/visit/searchBar'

const Visit = () => {
  return (
    <>
      {/* <Header /> */}
      <Header pageTitle='Visit' />

      <main>
        <div className='space-between w-100 h-100 flex flex-col'>
          <div className='flex h-screen flex-col px-4'>
            <h1 className='py-2 text-center'>Visit Page</h1>
            <VisitsSearchBar />
          </div>
          <AddButton />
        </div>
      </main>
    </>
  )
}

export default Visit
