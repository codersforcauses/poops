import { Timestamp } from 'firebase/firestore'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { useFirestore } from '@/context/firestore'
// import { withProtected } from '@/components/PrivateRoute'

const Visit = () => {
  const { userDoc } = useFirestore()

  console.log(userDoc.time instanceof Timestamp)
  return (
    <>
      {/* <Header /> */}
      <Header pageTitle='Visit' />

      <main>
        <p>Visit Page</p>
      </main>
      <NavBar />
    </>
  )
}

// export default withProtected(Visit)
export default Visit
