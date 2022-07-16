import React from 'react'
import { useRouter } from 'next/router'

import { getInitialData } from '@/components/Firebase/init'
import { useAuth } from '@/context/auth'

export function withPublic(Component: React.ComponentType) {
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

export function withProtected(Component: React.ComponentType) {
  return function PrivateComponent(props: object) {
    const { auth } = useAuth()
    const user = auth.currentUser
    const router = useRouter()
    if (user === null) {
      router.replace('/login')
      return <h1>Loading...</h1> // TODO make a better looking loading screen?
    }
    getInitialData()
    return <Component {...props} />
  }
}
