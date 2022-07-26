import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

import Alert from '@/components/UI/alert'

export interface AlertContentProps {
  title?: string
  text: string
  variant: AlertVariant
  position?: 'top' | 'bottom'
  confirmFunction?: () => void
  cancelFunction?: () => void
  showFor?: number
}

export enum AlertVariant {
  info,
  security,
  critical,
  comment
}

interface AlertContextProps {
  setAlert: (content: AlertContentProps) => void
  clearAlert: () => void
  visible: boolean
}

const alertContext = createContext<AlertContextProps>({
  setAlert: () => {
    return
  },
  clearAlert: () => {
    return
  },
  visible: false
})

export const useAlert = () => useContext(alertContext)

export const AlertContextProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false)
  const [content, setContent] = useState<AlertContentProps>({
    title: '',
    text: '',
    position: 'top',
    confirmFunction: undefined, // function to execute on confirm, enables the confirm function
    cancelFunction: undefined,
    showFor: 5000, // ms alert will stay open, set to -1 to leave open until button click
    variant: AlertVariant.info
  })

  const setAlert = (content: AlertContentProps) => {
    setContent({
      title: content.title ?? '',
      text: content.text,
      variant: content.variant,
      position: content.position ?? 'top',
      confirmFunction: content.confirmFunction ?? undefined,
      cancelFunction: content.cancelFunction ?? undefined,
      showFor: content.showFor ?? 5000
    })
  }

  const clearAlert = useCallback(() => {
    setVisible(false)
    setContent({
      text: '',
      title: '',
      position: 'top',
      confirmFunction: undefined,
      cancelFunction: undefined,
      showFor: 5000,
      variant: AlertVariant.info
    })
  }, [])

  const value: AlertContextProps = useMemo(
    () => ({
      setAlert,
      clearAlert,
      visible
    }),
    [clearAlert, visible]
  )

  return (
    <alertContext.Provider value={value}>
      <Alert visible={visible} setVisible={setVisible} content={content} />
      {children}
    </alertContext.Provider>
  )
}
