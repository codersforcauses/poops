import React from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'

export function withPublic(Component: React.ComponentType) {
  return function PublicComponent(props: object) {
    const { auth } = useAuth()
    const user = auth.currentUser
    const router = useRouter()
    // console.log(user)

    if (user !== null) {
      router.replace('/')
      return <h1>Loading...</h1>
    }
    return <Component {...props} />
  }
}

export function withProtected(Component: React.ComponentType) {
  return function PrivateComponent(props: object) {
    // console.log(props)
    // console.log(typeof(props))
    const { auth } = useAuth()
    const user = auth.currentUser
    const router = useRouter()
    // console.log(user)
    if (user === null) {
      router.replace('/login')
      return <h1>Loading...</h1>
    }
    return <Component {...props} />
  }
}
