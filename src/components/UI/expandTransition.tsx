import { useCallback, useEffect, useRef, useState } from 'react'

type TransitionProps = {
  isExpanded: boolean | null
  duration?: number
  children?: JSX.Element
  className?: string
}

const ExpandTransition: React.FC<TransitionProps> = ({
  isExpanded,
  duration = 300, // desired duration in ms
  children,
  className
}) => {
  const getClasses = `overflow-y-hidden transition-all ${
    typeof className !== 'undefined' && className
  }`

  const [maxHeight, setMaxHeight] = useState<number>(-1)
  const ref = useRef<HTMLDivElement>(null)

  const updateExpanded = useCallback(
    (expanded: boolean | null, element: HTMLElement) => {
      const s = element.style
      if (expanded === false) {
        s.maxHeight = '0px'
        s.opacity = '0.0'
      } else {
        // if is either not active (null) or expanded (true) max height will be initial
        s.maxHeight = `${maxHeight}px`
        s.opacity = '1.0'
      }
    },
    [maxHeight]
  )

  // Set the maximum height when ref changes and exists
  // scrollHeight and clientHeight are inversely related
  // this means they add to the true height no matter what overflow
  useEffect(() => {
    if (maxHeight === -1 && ref.current) {
      let h = -1
      if (ref.current && ref.current.firstChild) {
        h = 0
        h = ref.current.scrollHeight + ref.current.clientHeight
        ref.current.firstChild.childNodes.forEach((child: ChildNode) => {
          if (child instanceof HTMLElement && child.dataset.expand) {
            // expand is our 'data-expand' attribute
            h += child.scrollHeight + child.clientHeight
          }
        })
      }
      setMaxHeight(h)
    }
  }, [ref, maxHeight])

  // Update the styles any time expanded prop changes
  useEffect(() => {
    if (ref.current) {
      updateExpanded(isExpanded, ref.current)
    }
  }, [isExpanded, updateExpanded])

  return isExpanded !== null || typeof isExpanded === 'undefined' ? (
    <div
      data-expand='true'
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        maxHeight: 0,
        opacity: 1.0
      }}
      className={getClasses}
    >
      {typeof children !== 'undefined' && children}
    </div>
  ) : (
    // don't wrap the element if isExpanded is unset
    <>{typeof children !== 'undefined' && children}</>
  )
}

export default ExpandTransition
