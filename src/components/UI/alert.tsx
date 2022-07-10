import { useCallback, useEffect, useRef, useState } from 'react'
import { AnnotationIcon, ExclamationIcon, InformationCircleIcon, ShieldExclamationIcon, XIcon } from '@heroicons/react/outline'

const iconColor = '#000000'
const titleColor = '#000000'
const textColor = '#000000'

const shadow = '0 2px 4px rgba(0,0,0,0.1),\
                0 4px 8px rgba(0,0,0,0.1),\
                0 8px 16px rgba(0,0,0,0.1),\
                0 16px 32px rgba(0,0,0,0.1),\
                0 32px 64px rgba(0,0,0,0.1),\
                0 64px 128px rgba(0,0,0,0.1)'

const getClasses = (visible: boolean, className: string) => {
  return ('flex items-center fixed top-0 left-0 right-0 z-999 pl-6 pt-4 pr-3 pb-3 mx-[2rem] \
              bg-white rounded-b-md text-black border-x-1 border-b-1 border-[#dddddd] \
              transition-transform duration-300 delay-150 ' +
            (visible ? 'translate-y-0 ease-out ' : '-translate-y-[200%] ease-in ') + className)
}

enum ModalType {
  'info',
  'security',
  'problem',
  'comment',
}

type AlertProps = {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  timeout?: number
  variant?: keyof typeof ModalType
  className?: string
}

const Alert: React.FC<AlertProps> = ({
      text,
      setText,
      timeout = 5000,
      variant = 'info',
      className,
    }) => {
    const [visible, setVisible] = useState(false)
    const [currentText, setCurrentText] = useState('')
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    const setUpdate = useCallback((message: string) => {
      if (message !== null && message !== '') {
        setCurrentText(message)
        setVisible(true)
        timerRef.current = setTimeout(() => {
          setVisible(false)
          setText('')
        }, timeout)
      }
    }, [setText, timeout])

    useEffect(() => {
      if (timerRef.current)
        clearTimeout(timerRef.current)
      setUpdate(text)
    }, [text, setUpdate])

    useEffect(()=> {
      return () => {
        if (timerRef.current)
          clearTimeout(timerRef.current)
      }
    }, [])

    return (
      <div
        className={getClasses(visible, className ? className : '')}
        style={{boxShadow: shadow}}
      >
        <div className='w-6 h-6'>
        { variant === 'info' ? (
            <InformationCircleIcon className='h-6 w-6'/>
          ) : variant === 'security' ? (
            <ShieldExclamationIcon className='h-6 w-6'/>
          ) : variant === 'problem' ? (
            <ExclamationIcon className='h-6 w-6'/>
          ) : variant === 'comment' && (
            <AnnotationIcon className='h-6 w-6'/>
          )
        }
        </div>
        <p className='text-xl font-bold ml-[2rem]' style={{color: titleColor}}>Title</p>
        <p className='self-start grow ml-4 mr-[2rem]' style={{color: textColor}}>{ currentText }</p>
        <button
        className='self-start'
        onClick={() => {
          setVisible(false)
          setText('')
        }}>
          <XIcon className='h-5 w-5' stroke={iconColor} />
        </button>
      </div>
    )
  }

export default Alert
