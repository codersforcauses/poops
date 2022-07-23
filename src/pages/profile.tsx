import Header from '@/components/Header'
import LoginPanel from '@/components/Login/LoginPanel'
import NavBar from '@/components/NavBar'
// import { withProtected } from '@/components/PrivateRoute'
import { useAuth } from '@/context/Auth'

const Profile = () => {
  const { logOut } = useAuth()
  // const googleProvider = new GoogleAuthProvider()
  // const facebookProvider = new FacebookAuthProvider()
  // const user: User | null | undefined = currentUser
  return (
    <>
      {/* <Seo /> */}
      <Header pageTitle='Profile' />

      <main>
        <p>Profile Page</p>
        <button onClick={logOut}>logout</button>
        <LoginPanel
          linkAccount={true} // Links Auth methods to current logged in user
          displayGoogle={true}
          displayFacebook={true}
          displayMicrosoft={true}
        />
      </main>
      <NavBar />
    </>
  )
}

export default Profile
// export default withProtected(Profile)
