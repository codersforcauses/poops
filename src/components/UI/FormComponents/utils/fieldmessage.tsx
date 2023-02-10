import { PropsWithChildren, useContext } from 'react'

import { FieldControlContext } from './fieldcontrol'

const FieldMessage = ({
  children,
  description,
  className = '',
  ...props
}: PropsWithChildren<FieldMessageProps>) => {
  const { error } = useContext(FieldControlContext)
  const errorClass = 'text-sm text-red'
  const messageClass = 'text-sm text-grey-dark'

  return (
    <span
      {...props}
      role={error && 'alert'}
      className={`text-primary-dark ${className} ${
        error && !description ? errorClass : messageClass
      }`}
    >
      {children}
    </span>
  )
}

export default FieldMessage

interface FieldMessageProps {
  className?: string
  description?: boolean
}
