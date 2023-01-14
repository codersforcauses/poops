import { NextPage } from 'next'

import NavBar from '@/components/NavBar'
// import LoginPanel from '@/components/Login/LoginPanel'
import { withProtected } from '@/components/PrivateRoute'
import UpdateDetailsPanel from '@/components/UpdateDetailsPanel/'
import { useAuth } from '@/context/Firebase/Auth/context'

const SignupDetails: NextPage = () => {
  const { logOut, currentUser } = useAuth()

  return (
    <>
      <h1>Setup Login</h1>
      <button onClick={logOut}>LOG OUT</button>
      <UpdateDetailsPanel currentUser={currentUser} />
      {/* <input type='text' value={displayName} placeholder='Name' />
      <input type='text' value={email} placeholder='Email' />
      <input type='text' value={phoneNumber} placeholder='Phone Number' /> */}
      <NavBar />
    </>
  )
}

export default withProtected(SignupDetails)
