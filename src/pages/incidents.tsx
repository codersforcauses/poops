import Header from '@/components/Header'

const Incidents = () => {
  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Incidents' />

      <main className='flex-col space-y-8'>
        <div className='space-between w-100 h-100 flex flex-col'>
          <div className='flex h-screen flex-col px-4'>
            <h1 className='py-2 text-center'>Incident Form</h1>
          </div>
        </div>
      </main>
    </>
  )
}

export default Incidents
