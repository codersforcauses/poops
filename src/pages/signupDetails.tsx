import { NextPage } from 'next'

import NavBar from '@/components/NavBar'
// import LoginPanel from '@/components/Login/LoginPanel'
import { withProtected } from '@/components/PrivateRoute'
import UpdateDetailsPanel from '@/components/UpdateDetailsPanel/'
import { useAuth } from '@/context/Firebase/Auth/context'
import useUser from '@/hooks/user'
import type { Contact } from '@/types/types'

const SignupDetails: NextPage = () => {
  const { logOut } = useAuth()
  const { data: currentUser } = useUser()
  if (currentUser === undefined) return null

  return (
    <>
      <h1>Please fill in your details</h1>
      <button onClick={logOut}>LOG OUT</button>
      <UpdateDetailsPanel contact={currentUser.info} />
      {/* <input type='text' value={displayName} placeholder='Name' />
      <input type='text' value={email} placeholder='Email' />
      <input type='text' value={phoneNumber} placeholder='Phone Number' /> */}
      <NavBar />
    </>
  )
}

export default withProtected(SignupDetails)
