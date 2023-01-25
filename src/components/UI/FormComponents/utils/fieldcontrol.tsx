import { createContext, PropsWithChildren, useMemo } from 'react'
import { ValidationValueMessage } from 'react-hook-form'

const FieldControlContext = createContext<FieldControlProps>({
  disabled: false,
  error: '',
  name: '',
  required: false
})

const FieldControl = ({
  children,
  ...props
}: PropsWithChildren<FieldControlProps>) => {
  const value = useMemo(() => props, [props])
  return (
    <FieldControlContext.Provider value={value}>
      {children}
    </FieldControlContext.Provider>
  )
}

export { FieldControl, FieldControlContext }

interface FieldControlProps {
  disabled: boolean
  error?: string
  name: string
  required?: string | boolean | ValidationValueMessage<boolean>
}
