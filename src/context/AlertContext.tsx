import React, { createContext, useCallback, useContext, useState } from 'react'

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

export const AlertContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
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
                filter: 'blur(5px)'
              }
            : {
                filter: 'blur(0px)'
              }
        }
        className={
          'z-999 pointer-events-none fixed top-0 right-0 bottom-0 left-0 overflow-scroll transition-all duration-700' +
          ' after:fixed after:top-0 after:right-0 after:bottom-0 after:left-0' +
          `${
            content.position === 'bottom' && visible
              ? ' after:pointer-events-auto'
              : ' after:pointer-events-none'
          }`
        }
      >
        {children}
      </div>
      <Alert visible={visible} content={content} clearAlert={clearAlert} />
    </AlertContext.Provider>
  )
}
