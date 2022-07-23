import { useEffect, useRef } from 'react'
import {
  AnnotationIcon,
  CheckIcon,
  ExclamationIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
  XIcon
} from '@heroicons/react/outline'

import { AlertContentProps, AlertVariant } from '@/context/AlertContext'

const iconColor = '#000000'
const titleColor = '#000000'
const textColor = '#000000'

const shadow =
  '0 2px 4px rgba(0,0,0,0.1),\
                0 4px 8px rgba(0,0,0,0.1),\
                0 8px 16px rgba(0,0,0,0.1),\
                0 16px 32px rgba(0,0,0,0.1),\
                0 32px 64px rgba(0,0,0,0.1)'

const buttonClasses =
  'mx-auto mt-2 w-fit rounded-lg bg-primary py-1 px-4 text-lg text-white shadow-md focus:outline-primary active:bg-dark-red'
const getContainerClasses = (vis: boolean, pos: string) => {
  return (
    `flex items-center fixed right-0 left-0 z-999 pointer-events-auto bg-white text-black border-x-1 border-[#dddddd] transition-transform duration-700` +
    `${
      pos === 'top'
        ? ' rounded-b-md border-b-1 -top-[250px] pl-5 pr-4 py-3 mx-[1rem]' +
          (vis ? ' translate-y-[250px]' : ' translate-y-[0px]')
        : pos === 'bottom' &&
          ' rounded-t-md border-t-1 bottom-[-300px] p-5 mx-[3rem] flex-wrap justify-center' +
            (vis ? ' translate-y-[-300px]' : ' translate-y-[0px]')
    }`
  )
}

type AlertProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  content: AlertContentProps
  clearAlert: () => void
}

const Alert: React.FC<AlertProps> = ({
  visible,
  setVisible,
  content,
  clearAlert
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (content.text !== '') {
      setVisible(true)
      if (content.showFor !== -1) {
        timerRef.current = setTimeout(() => {
          clearAlert()
        }, content.showFor)
      }
    }
  }, [content, setVisible, clearAlert])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      className={getContainerClasses(visible, content.position ?? 'top')}
      style={{ boxShadow: shadow }}
    >
      <div className='h-7 w-7'>
        {content.variant === AlertVariant.info ? (
          <InformationCircleIcon className='h-7 w-7' />
        ) : content.variant === AlertVariant.security ? (
          <ShieldExclamationIcon className='h-7 w-7' />
        ) : content.variant === AlertVariant.critical ? (
          <ExclamationIcon className='h-7 w-7' />
        ) : (
          content.variant === AlertVariant.comment && (
            <AnnotationIcon className='h-7 w-7' />
          )
        )}
      </div>
      <div
        className={
          content.position === 'bottom'
            ? 'mx-[1rem]'
            : 'mx-[1rem] grow self-start'
        }
      >
        <p className='font-bold' style={{ color: titleColor }}>
          {content.title}
        </p>
        <p style={{ color: textColor }}>{content.text}</p>
      </div>
      {content.position === 'bottom' ? (
        <div className='h-0 basis-full'></div>
      ) : (
        ''
      )}
      <div className={content.position === 'bottom' ? 'pt-5' : 'h-5'}>
        {typeof content.confirmFunction !== 'undefined' && (
          <button
            className={
              content.position === 'bottom' ? buttonClasses + ' mr-4' : 'mr-4'
            }
            onClick={(e) => {
              e.preventDefault()
              setVisible(false)
              if (typeof content.confirmFunction !== 'undefined')
                content.confirmFunction()
            }}
          >
            <CheckIcon
              className='h-5 w-5'
              stroke={content.position === 'bottom' ? 'white' : iconColor}
            />
          </button>
        )}
        <button
          className={content.position === 'bottom' ? buttonClasses : ''}
          onClick={(e) => {
            e.preventDefault()
            setVisible(false)
            if (typeof content.cancelFunction !== 'undefined')
              content.cancelFunction()
          }}
        >
          <XIcon
            className='h-5 w-5'
            stroke={content.position === 'bottom' ? 'white' : iconColor}
          />
        </button>
      </div>
    </div>
  )
}

export default Alert
