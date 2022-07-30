import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import { useAuth } from '@/context/Firebase/Auth/context'

const Home = () => {
  const { logOut } = useAuth()
  return (
    <>
      {/* <Header /> */}
      <Header />

      <main>
        <p>Home Page</p>
        <button onClick={logOut}>LOG OUT</button>
      </main>
      <NavBar />
    </>
  )
}

export default withProtected(Home)
