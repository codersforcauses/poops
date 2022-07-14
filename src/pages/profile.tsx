import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
// import { withProtected } from '@/components/PrivateRoute'
import { useAuth } from '@/context/auth'

const Profile = () => {
  const { logOut } = useAuth()
  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Profile' />

      <main>
        <p>Profile Page</p>
        <button onClick={logOut}>logout</button>
      </main>
      <NavBar />
    </>
  )
}

export default Profile
// export default withProtected(Profile)
