import Header from '@/components/Header'
import IncidentForm from '@/components/IncidentForm'

const Visit = () => {
  return (
    <>
      {/* <Header /> */}
      <Header pageTitle='Visit' />

      <main>
        <p>Visit Page</p>
        {/* TODO: Add button to open up form*/}
        <IncidentForm isVetVisit={false} />
      </main>
    </>
  )
}

export default Visit
