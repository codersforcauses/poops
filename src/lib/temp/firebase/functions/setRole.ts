interface ISetRoles {
  email: string
  roles: Record<string, boolean>
}

const setRoles = async (data: ISetRoles) => {
  const response = await fetch('/api/setRole', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return response
}

export default setRoles
