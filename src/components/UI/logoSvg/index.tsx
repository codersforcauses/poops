import { useCallback } from 'react'

interface svgProps {
  name: string
  className?: string
  viewBox?: string
  fill?: string
  stroke?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

const Facebook =
  'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
const Google =
  'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
const Microsoft =
  'M0 0v11.408h11.408V0zm12.594 0v11.408H24V0zM0 12.594V24h11.408V12.594zm12.594 0V24H24V12.594z'
const SolidEmojiSad =
  'M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z'

const Logo = (props: svgProps) => {
  const svgPath = useCallback(() => {
    switch (props.name) {
      case 'Facebook':
        return <path fillRule='evenodd' clipRule='evenodd' d={Facebook} />
      case 'Google':
        return <path fillRule='evenodd' clipRule='evenodd' d={Google} />
      case 'Microsoft':
        return <path fillRule='evenodd' clipRule='evenodd' d={Microsoft} />
      default:
        return <path fillRule='evenodd' clipRule='evenodd' d={SolidEmojiSad} />
    }
  }, [props.name])

  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...props}>
      {svgPath()}
    </svg>
  )
}

export default Logo
