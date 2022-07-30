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

const AlertContext = createContext<AlertContextProps>({
  setAlert: () => {
    return
  },
  clearAlert: () => {
    return
  },
  visible: false
})

export const useAlert = () => useContext(AlertContext)

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
    setVisible(true)
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

  const value: AlertContextProps = {
    setAlert,
    clearAlert,
    visible
  }

  return (
    <AlertContext.Provider value={value}>
      <div
        style={
          visible && content.position === 'bottom'
            ? {
                filter: 'blur(3px) brightness(0.85) grayscale(0.6)',
                backgroundColor: 'white'
              }
            : {
                filter: 'blur(0px) brightness(1.0) grayscale(0.0)'
              }
        }
        className='z-999 fixed top-0 right-0 bottom-0 left-0 -m-10 transition-[filter] duration-700'
      >
        {visible && content.position === 'bottom' && (
          <div
            style={{
              pointerEvents: 'all',
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 999
            }} // consume all clicks if alert is visible and bottom
          ></div>
        )}
        {children}
      </div>
      <Alert visible={visible} content={content} clearAlert={clearAlert} />
    </AlertContext.Provider>
  )
}
