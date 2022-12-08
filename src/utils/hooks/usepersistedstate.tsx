import { useEffect, useState } from 'react'

const usePersistedState = (
  key: string,
  defaultValue: Record<string, unknown>
) => {
  const [state, setState] = useState(() => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export default usePersistedState
