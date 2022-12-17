import { ReactNode, useMemo, useState } from 'react'

import {
  VisitContextProps,
  VisitContextProvider
} from '@/context/VisitContext/context'

const VisitProvider = ({ children }: { children: ReactNode }) => {
  const [currentForm, setCurrentForm] = useState<null | JSX.Element>(null)

  const value: VisitContextProps = useMemo(
    () => ({
      getCurrentForm: () => currentForm,
      setCurrentForm: setCurrentForm
    }),
    [currentForm]
  )

  return <VisitContextProvider value={value}>{children}</VisitContextProvider>
}

export default VisitProvider
