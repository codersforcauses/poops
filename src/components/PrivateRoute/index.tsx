import { ComponentType } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/Firebase/Auth/context'
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
    const user = auth.currentUser
    const router = useRouter()
    if (user === null) {
      router.replace('/login')
    }
    return <Component {...props} />
  }
  return PrivateComponent as NextPageWithLayout
}
