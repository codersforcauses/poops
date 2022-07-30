import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
// import { withProtected } from '@/components/PrivateRoute'
import AlertExamples from '@/components/UI/alertExample'

const AlertTesting = () => {
  return (
    <>
      {/* <Header /> */}
      <Header pageTitle='AlertTesting' />
      <AlertExamples />
      <main>
        <p>Visit Page</p>
      </main>
      <NavBar />
    </>
  )
}

// export default withProtected(Visit)
export default AlertTesting
