import { PropsWithChildren, useState } from 'react'

interface TooltipProps extends PropsWithChildren {
  tooltip?: string
}

const Tooltip = (props: TooltipProps) => {
  const [isShown, setIsShown] = useState(false)

  const hide = () => setIsShown(false)
  const show = () => setIsShown(true)

  return (
    // Wrapper
    <div className='relative'>
      <div>
        {/* Text */}
        <div>
          <span
            className='inline-block w-full text-lg hover:text-primary-dark'
            onMouseEnter={show}
            onMouseLeave={hide}
            onBlur={hide}
          >
            {props.children}
            {/* Tooltip */}
            {props.tooltip && (
              <div
                className='absolute left-1/2 z-50 inline-block -translate-x-1/2 translate-y-2 whitespace-pre rounded bg-zinc-800 p-2 text-center text-white drop-shadow-md'
                style={{ visibility: isShown ? 'visible' : 'hidden' }}
              >
                {props.tooltip}
                <div className='absolute left-1/2 bottom-full h-3 w-3 translate-y-1/2 -translate-x-1/2 rotate-45 bg-zinc-600 drop-shadow-md' />
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Tooltip
