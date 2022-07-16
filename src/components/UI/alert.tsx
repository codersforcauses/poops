import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnnotationIcon,
  CheckIcon,
  ExclamationIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
  XIcon
} from '@heroicons/react/outline'

export enum AlertIcon {
  info,
  security,
  critical,
  comment
}

const iconColor = '#000000'
const titleColor = '#000000'
const textColor = '#000000'

const shadow =
  '0 2px 4px rgba(0,0,0,0.1),\
                0 4px 8px rgba(0,0,0,0.1),\
                0 8px 16px rgba(0,0,0,0.1),\
                0 16px 32px rgba(0,0,0,0.1),\
                0 32px 64px rgba(0,0,0,0.1)'

const getClasses = (vis: boolean, pos: string) => {
  return (
    `flex items-center fixed right-0 left-0 z-999 pl-5 pr-4 py-3 mx-[1rem] bg-white text-black border-x-1 border-[#dddddd] transition-transform duration-700` +
    `${
      pos === 'top'
        ? ' rounded-b-md border-b-1 -top-[500px]' +
          (vis ? ' translate-y-[500px]' : ' translate-y-[250px]')
        : pos === 'bottom' &&
          ' rounded-t-md border-t-1 bottom-0' +
            (vis ? ' translate-y-[0]' : ' translate-y-[250px]')
    }`
  )
}

type AlertProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  content: AlertContentProps
}

export interface AlertContentProps {
  title?: string
  text: string
  icon: AlertIcon
  position?: 'top' | 'bottom'
  confirmFunction?: () => void
  cancelFunction?: () => void
  showFor?: number
}

const Alert: React.FC<AlertProps> = () => {
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
  const [contentBuffer, setContentBuffer] = useState<AlertContentProps>(content)

  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  // utility function that sets and then clears a timer to automatically close alert
  const doUpdate = useCallback(
    (c: AlertContentProps) => {
      if (c.text !== '') {
        setContentBuffer(content)
        setContent({
          title: c.title,
          text: c.text, // string[2], first element is tile, second is message
          position: c.position,
          confirmFunction: c.confirmFunction, // function to execute on confirm, enables the confirm function
          cancelFunction: c.cancelFunction,
          showFor: c.showFor, // ms alert will stay open, set to -1 to leave open until button click
          icon: c.icon
        })
        setVisible(true)
        if (c.showFor !== -1) {
          timerRef.current = setTimeout(() => {
            setVisible(false)
          }, content.showFor)
        }
      }
    },
    [content, setVisible]
  )

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    doUpdate(content)
  }, [content, doUpdate])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const setAlert = (content: AlertContentProps) => {
    setContent({
      title: content.title ? content.title : '',
      text: content.text,
      icon: content.icon,
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

  return (
    <div
      className={getClasses(
        visible,
        contentBuffer.position ? contentBuffer.position : 'top'
      )}
      style={{ boxShadow: shadow }}
    >
      <div className='h-7 w-7'>
        {contentBuffer.icon === AlertIcon.info ? (
          <InformationCircleIcon className='h-7 w-7' />
        ) : contentBuffer.icon === AlertIcon.security ? (
          <ShieldExclamationIcon className='h-7 w-7' />
        ) : contentBuffer.icon === AlertIcon.critical ? (
          <ExclamationIcon className='h-7 w-7' />
        ) : (
          contentBuffer.icon === AlertIcon.comment && (
            <AnnotationIcon className='h-7 w-7' />
          )
        )}
      </div>
      <div className='mx-[1rem] grow self-start'>
        <p className='font-bold' style={{ color: titleColor }}>
          {contentBuffer.title}
        </p>
        <p style={{ color: textColor }}>{contentBuffer.text}</p>
      </div>
      {typeof contentBuffer.confirmFunction !== 'undefined' && (
        // if we have a confirmFunction show confirm button
        <button
          className='pr-4'
          onClick={(e) => {
            e.preventDefault()
            setVisible(false)
            if (typeof contentBuffer.confirmFunction !== 'undefined')
              contentBuffer.confirmFunction()
          }}
        >
          <CheckIcon className='h-5 w-5' stroke={iconColor} />
        </button>
      )}
      <button
        onClick={(e) => {
          e.preventDefault()
          setVisible(false)
          if (typeof contentBuffer.cancelFunction !== 'undefined')
            contentBuffer.cancelFunction()
        }}
      >
        <XIcon className='h-5 w-5' stroke={iconColor} />
      </button>
    </div>
  )
}

export default Alert
