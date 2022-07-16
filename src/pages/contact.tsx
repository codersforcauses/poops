import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
// import { withProtected } from '@/components/PrivateRoute'

const Contact = () => {
  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Contact' />

      <main>
        <p>Contact Page</p>
      </main>
      <NavBar />
    </>
  )
}

export default Contact
// export default withProtected(Contact)
