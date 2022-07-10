import { useState, useRef, useEffect } from 'react'

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
  let pos = 'flex items-center fixed top-0 left-0 right-0 z-999 pl-6 pt-3 pr-3 pb-2 mx-[2rem] '
  let design = 'bg-white rounded-b-md text-black border-x-1 border-b-1 border-[#dddddd] transition-transform duration-300 delay-150 '
  let animate = visible ? 'translate-y-0 ease-out' : '-translate-y-[200%] ease-in'
  return (pos + design + animate + className)
}

enum ModalType {
  'info',
  'problem',
  'comment'
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
    let timerRef = useRef<ReturnType<typeof setTimeout>>()

    const setUpdate = () => {
      if (text !== null && text !== '') {
        setCurrentText(text)
        setVisible(true)
        timerRef.current = setTimeout(() => {
          setVisible(false)
          setText('')
        }, timeout)
      }
    }

    useEffect(() => {
      if (timerRef.current)
        clearTimeout(timerRef.current)
      setUpdate()
    }, [text])

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
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke={iconColor} strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
          ) : variant === 'problem' ? (
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke={iconColor} strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
            </svg>
          ) : variant === 'comment' && (
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke={iconColor} strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' />
            </svg>
          )
        }
        </div>
        <p className='text-xl font-bold ml-[2rem] leading-4' style={{color: titleColor}}>Title</p>
        <p className='grow ml-4 mr-[2rem]' style={{color: textColor}}>{ currentText }</p>
        <button
        className='self-start'
        onClick={() => {
          setVisible(false)
          setText('')
        }}>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke={iconColor} strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
      </div>
    )
  }

export default Alert
