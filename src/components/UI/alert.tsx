import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnnotationIcon,
  CheckIcon,
  ExclamationIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
  XIcon
} from '@heroicons/react/outline'

import { AlertContentProps } from '@/context/AlertContext'

export enum AlertIcon {
  info,
  security,
  warning,
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
    `flex items-center fixed right-0 left-0 z-999 pl-6 pr-4 mx-[2rem] bg-white text-black border-x-1 border-[#dddddd] transition-transform duration-500` +
    `${
      pos === 'top'
        ? ' pt-4 pb-3 rounded-b-md border-b-1 -top-[240px]' +
          (vis ? ' translate-y-[240px]' : ' translate-y-[120px]')
        : pos === 'bottom' &&
          ' pb-4 pt-3 rounded-t-md border-t-1 bottom-16' +
            (vis ? ' translate-y-[0]' : ' translate-y-[120px]')
    }`
  )
}

type AlertProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  content: AlertContentProps
}

const Alert: React.FC<AlertProps> = ({ visible, setVisible, content }) => {
  const [isMoving, setIsMoving] = useState(false)
  const [contentCache, setContentCache] = useState<AlertContentProps>({
    title: '', // string[2], first element is tile, second is message
    text: '',
    position: 'top',
    confirmFunction: () => {
      return
    }, // function to execute on confirm, enables the confirm function
    cancelFunction: () => {
      return
    },
    showFor: 5000, // ms alert will stay open, set to -1 to leave open until button click
    icon: AlertIcon.info
  })

  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  // utility function that sets and then clears a timer to automatically close alert
  const doUpdate = useCallback(
    (c: AlertContentProps, m: boolean) => {
      if (!(c.title === '' && c.title === '')) {
        const nextContent: AlertContentProps = {
          title: c.title,
          text: c.text, // string[2], first element is tile, second is message
          position: c.position,
          confirmFunction: c.confirmFunction, // function to execute on confirm, enables the confirm function
          cancelFunction: c.cancelFunction,
          showFor: c.showFor, // ms alert will stay open, set to -1 to leave open until button click
          icon: c.icon
        }
        if (m) {
          setVisible(false)
          setIsMoving(true)
          timerRef.current = setTimeout(() => {
            setContentCache(nextContent)
            setVisible(true)
            timerRef.current = setTimeout(() => {
              setVisible(false)
              setIsMoving(false)
            }, nextContent.showFor)
          }, 300)
        } else {
          setContentCache(nextContent)
          setVisible(true)
          setIsMoving(true)
          timerRef.current = setTimeout(() => {
            setVisible(false)
            setIsMoving(false)
          }, content.showFor)
        }
      }
    },
    [content, setVisible]
  )

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    doUpdate(content, isMoving)
  }, [content, doUpdate, isMoving])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      className={getClasses(
        visible,
        contentCache.position ? contentCache.position : 'top'
      )}
      style={{ boxShadow: shadow }}
    >
      <div className='h-7 w-7'>
        {contentCache.icon === AlertIcon.info ? (
          <InformationCircleIcon className='h-7 w-7' />
        ) : contentCache.icon === AlertIcon.security ? (
          <ShieldExclamationIcon className='h-7 w-7' />
        ) : contentCache.icon === AlertIcon.warning ? (
          <ExclamationIcon className='h-7 w-7' />
        ) : (
          contentCache.icon === AlertIcon.comment && (
            <AnnotationIcon className='h-7 w-7' />
          )
        )}
      </div>
      <p
        className='ml-[2rem] self-start font-bold'
        style={{ color: titleColor }}
      >
        {contentCache.title}
      </p>
      <p
        className='ml-4 mr-[2rem] grow self-start'
        style={{ color: textColor }}
      >
        {contentCache.text}
      </p>
      {typeof contentCache.confirmFunction !== 'undefined' && (
        // if we have a confirmFunction show confirm button
        <button
          className='pr-4'
          onClick={(e) => {
            e.preventDefault()
            setVisible(false)
            if (typeof content.confirmFunction !== 'undefined')
              content.confirmFunction()
          }}
        >
          <CheckIcon className='h-5 w-5' stroke={iconColor} />
        </button>
      )}
      <button
        onClick={(e) => {
          e.preventDefault()
          setVisible(false)
          if (typeof content.cancelFunction !== 'undefined')
            content.cancelFunction()
        }}
      >
        <XIcon className='h-5 w-5' stroke={iconColor} />
      </button>
    </div>
  )
}

export default Alert
