import { FacebookAuthProvider } from 'firebase/auth'

import Header from '@/components/Header'
import LoginButton from '@/components/Login/LoginButton'
import NavBar from '@/components/NavBar'
// import { withProtected } from '@/components/PrivateRoute'
import { useAuth } from '@/context/AuthContext'

const Profile = () => {
  const { logOut, linkAuthProvider, currentUser } = useAuth()
  // const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  // const user: User | null | undefined = currentUser
  if (currentUser === null || currentUser === undefined) {
    return null
  } else {
    return (
      <>
        {/* <Seo /> */}
        <Header pageTitle='Profile' />

        <main>
          <p>Profile Page</p>
          <button onClick={logOut}>logout</button>
          <LoginButton
            handler={() => linkAuthProvider?.(currentUser, facebookProvider)}
            icon={null}
            buttonlabel='Continue with Google'
            style='h-12 rounded-full border-4 border-t-googleblue border-r-googlegreen border-b-googleyellow border-l-googlered px-6 transition duration-300'
            display={true}
          />
        </main>
        <NavBar />
      </>
    )
  }
}

export default Profile
// export default withProtected(Profile)
