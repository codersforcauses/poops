import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'

const Incidents = () => {
  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Incidents' />

      <main>
        <p>Incidents Page</p>
      </main>

      <NavBar />
    </>
  )
}

export default withProtected(Incidents)
