import { User } from '@firebase/auth'

interface ISetRoles {
  email: string
  roles: Record<string, boolean>
}

const setRole = async (data: ISetRoles) => {
  const response = await fetch('/api/setRole', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return response
}

const mod = async (
  adminAccess: boolean,
  currentUser: User,
  refreshUserToken: () => Promise<void>,
  getUserDoc?: () => Promise<void>
) => {
  try {
    if (currentUser?.email) {
      const reponse = await setRole({
        email: currentUser.email,
        roles: { admin: adminAccess }
      })
      const data = await reponse.json()
      console.log('Next API Response', data)
      refreshUserToken()
      getUserDoc?.()
    }
  } catch (error) {
    console.log('Firebase Functions Error: ', error)
  }
}

export default mod
