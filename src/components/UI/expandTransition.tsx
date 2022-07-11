import { useEffect, useRef } from 'react'

type TransitionProps = {
  isExpanded: boolean | null
  resiseCompensation?: number
  duration?: number
  children?: JSX.Element
  className?: string
}

const ExpandTransition: React.FC<TransitionProps> = ({
  isExpanded,
  resiseCompensation = 120,
  children,
  className
}) => {
  const getClasses =
    'overflow-y-hidden opacity-1 transition-all duration-300 ' +
    (typeof className !== 'undefined' && className)

  const ref = useRef<HTMLDivElement>(null)

  const doUpdate = (current: HTMLDivElement | null) => {
    if (current !== null) {
      if (isExpanded === false) {
        current.style.maxHeight = '0px'
        current.classList.add('opacity-0')
      }
      if (isExpanded === true) {
        const newHeight = current.children[0].clientHeight + resiseCompensation
        current.style.maxHeight = newHeight + 'px'
        current.classList.remove('opacity-0')
      }
    }
  }

  useEffect(() => {
    doUpdate(ref.current)
  }, [isExpanded])

  return (
    isExpanded !== null ? (
      <div ref={ref} style={{ maxHeight: 0 }} className={getClasses}>
        {typeof children !== 'undefined' && children}
      </div>
    ) : (
      <>
        {typeof children !== 'undefined' && children}
      </>
    )
  )
}

export default ExpandTransition
