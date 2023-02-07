import { createContext, PropsWithChildren } from 'react'
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
  return (
    <FieldControlContext.Provider value={props}>
      {children}
    </FieldControlContext.Provider>
  )
}

export { FieldControl, FieldControlContext }

interface FieldControlProps {
  disabled?: boolean
  error?: string
  name: string
  required?: string | boolean | ValidationValueMessage<boolean>
}
