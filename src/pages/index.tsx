import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
// import { withProtected } from '@/components/PrivateRoute'

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Header />

      <main>
        <p>Home Page</p>
      </main>
      <NavBar />
    </>
  )
}

export default Home
// export default withProtected(Home)
