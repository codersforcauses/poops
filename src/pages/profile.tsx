import Header from '@/components/Header'
import LoginPanel from '@/components/Login/LoginPanel'
import NavBar from '@/components/NavBar'
// import { withProtected } from '@/components/PrivateRoute'
import { useAuth } from '@/context/AuthContext'

const Profile = () => {
  const { logOut, currentUser } = useAuth()
  // const googleProvider = new GoogleAuthProvider()
  // const facebookProvider = new FacebookAuthProvider()
  // const user: User | null | undefined = currentUser
  if (currentUser === null || currentUser === undefined) {
    // TODO Do this better?
    return null
  } else {
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
            displayTwitter={true}
            displayMicrosoft={true}
            displayYahoo={false}
            displayApple={false}
          />
        </main>
        <NavBar />
      </>
    )
  }
}

export default Profile
// export default withProtected(Profile)
