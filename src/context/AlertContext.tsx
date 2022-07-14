import React, { createContext, useContext, useState } from 'react'

import Alert, { AlertIcon } from '@/components/UI/alert'

export interface AlertContentProps {
  title: string
  text: string
  icon: AlertIcon
  position?: 'top' | 'bottom'
  confirmFunction?: () => void
  cancelFunction?: () => void
  showFor?: number
}
interface AlertContextProps {
  setAlert: (content: AlertContentProps) => void
  clearAlert: () => void
}

const alertContext = createContext<AlertContextProps>({
  setAlert: () => {
    return
  },
  clearAlert: () => {
    return
  }
})

export const useAlert = () => useContext(alertContext)

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
    icon: AlertIcon.info
  })

  const setAlert = (content: AlertContentProps) => {
    setContent({
      title: content.title,
      text: content.text,
      icon: content.icon ? content.icon : AlertIcon.info,
      position: content.position ? content.position : 'top',
      confirmFunction: content.confirmFunction
        ? content.confirmFunction
        : undefined,
      cancelFunction: content.cancelFunction
        ? content.cancelFunction
        : undefined,
      showFor: content.showFor ? content.showFor : 5000
    })
  }

  const clearAlert = () => {
    setVisible(false)
    setContent({
      text: '',
      title: '',
      position: 'top',
      confirmFunction: undefined,
      cancelFunction: undefined,
      showFor: 5000,
      icon: AlertIcon.info
    })
  }

  const value: AlertContextProps = {
    setAlert,
    clearAlert
  }

  return (
    <alertContext.Provider value={value}>
      <Alert visible={visible} setVisible={setVisible} content={content} />
      {children}
    </alertContext.Provider>
  )
}
