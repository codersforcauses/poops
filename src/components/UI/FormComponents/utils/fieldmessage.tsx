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
      className={[error && !description ? errorClass : messageClass, className]
        .join(' ')
        .trim()}
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
