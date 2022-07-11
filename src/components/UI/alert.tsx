import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnnotationIcon,
  ExclamationIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
  XIcon
} from '@heroicons/react/outline'

// COLORS
const iconColor = '#000000'
const titleColor = '#000000'
const textColor = '#000000'

const shadow =
  '0 2px 4px rgba(0,0,0,0.1),\
                0 4px 8px rgba(0,0,0,0.1),\
                0 8px 16px rgba(0,0,0,0.1),\
                0 16px 32px rgba(0,0,0,0.1),\
                0 32px 64px rgba(0,0,0,0.1)'

const getClasses = (visible: boolean, className: string) => {
  return (
    'flex items-center fixed top-0 left-0 right-0 z-999 pl-6 pt-4 pr-4 pb-3 mx-[2rem] \
              bg-white rounded-b-md text-black border-x-1 border-b-1 border-[#dddddd] \
              transition-transform duration-300 delay-150' +
    (visible ? ' translate-y-0 ease-out ' : ' -translate-y-[200%] ease-in ') +
    (typeof className !== 'undefined' && className)
  )
}

export enum AlertIcon {
  info,
  security,
  problem,
  comment
}

type AlertProps = {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  showFor?: number
  icon?: AlertIcon
  className?: string
}

const Alert: React.FC<AlertProps> = ({
  text,
  setText,
  showFor = 5000,
  icon = AlertIcon.info,
  className
}) => {
  const [visible, setVisible] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  // utility function that sets and then clears a timer to automatically close alert
  const doUpdate = useCallback(
    (message: string) => {
      if (message !== null && message !== '') {
        setCurrentText(message)
        setVisible(true)
        timerRef.current = setTimeout(() => {
          setVisible(false)
          setText('')
        }, showFor)
      }
    },
    [setText, showFor]
  )

  useEffect(() => {
    // whenever text prop is changed, re-show timer for showFor
    if (timerRef.current) clearTimeout(timerRef.current)
    doUpdate(text)
  }, [text])

  useEffect(() => {
    // cleanup the timer when component unmounts
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      className={getClasses(visible, className ? className : '')}
      style={{ boxShadow: shadow }}
    >
      <div className='h-7 w-7'>
        {icon === AlertIcon.info ? (
          <InformationCircleIcon className='h-7 w-7' />
        ) : icon === AlertIcon.security ? (
          <ShieldExclamationIcon className='h-7 w-7' />
        ) : icon === AlertIcon.problem ? (
          <ExclamationIcon className='h-7 w-7' />
        ) : (
          icon === AlertIcon.comment && <AnnotationIcon className='h-7 w-7' />
        )}
      </div>
      <p
        className='ml-[2rem] self-start font-bold'
        style={{ color: titleColor }}
      >
        Title
      </p>
      <p
        className='ml-4 mr-[2rem] grow self-start'
        style={{ color: textColor }}
      >
        {currentText}
      </p>
      <button
        className='self-start'
        onClick={() => {
          setVisible(false)
          setText('')
        }}
      >
        <XIcon className='h-5 w-5' stroke={iconColor} />
      </button>
    </div>
  )
}

export default Alert
