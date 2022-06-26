import VisitsSearchBar from '../components/VisitsSearchBar'

function Visit() {
  return (
    <div className='space-between flex h-screen flex-col'>
      <div className='flex h-screen flex-col px-4'>
        <h1 className='py-2 text-center'>Visit Page</h1>
        <VisitsSearchBar />
      </div>
      <div className='h-10 bg-slate-300 py-2 text-center'>
        Imagine there&apos;s a navbar here
      </div>
    </div>
  )
}

export default Visit
