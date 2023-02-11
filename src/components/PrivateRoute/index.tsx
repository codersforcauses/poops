import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/Firebase/Auth/context'
import useUser from '@/hooks/user'
import { NextPageWithLayout } from '@/pages/_app'

export function withPublic(Component: NextPageWithLayout) {
  return function PublicComponent(props: object) {
    const { auth } = useAuth()
    const user = auth.currentUser
    const router = useRouter()
    if (user !== null) {
      router.replace('/')
      return <h1>Loading...</h1> // TODO make a better looking loading screen?
    }
    return <Component {...props} />
  }
}

export const withProtected = (Component: NextPageWithLayout) => {
  const PrivateComponent = (props: object) => {
    const { auth } = useAuth()
    const { data: userData } = useUser()
    const user = auth.currentUser
    const router = useRouter()
    if (user === null) {
      router.replace('/login')
    }
    useEffect(() => {
      console.log('New user check triggered')
      if (
        userData &&
        !(userData.info.email && userData.info.phone && userData.info.name)
      ) {
        router.replace('/signupDetails')
      }
    }, [router, userData])
    return <Component {...props} />
  }
  return PrivateComponent as NextPageWithLayout
}
