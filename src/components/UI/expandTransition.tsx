import { Transition } from '@headlessui/react'

type TransitionProps = {
  isExpanded: boolean
  children: JSX.Element
  className?: string
}
const ExpandTransition: React.FC<TransitionProps> = ({
  isExpanded,
  children,
  className,
}) => {
  return (
    <Transition
      show={isExpanded}
      className={'overflow-y-hidden ' + (className ? className : '')}
      enter='duration-500 opacity'
      enterFrom='max-h-0'
      enterTo='max-h-screen'
      leave='duration-500 opacity'
      leaveFrom='max-h-screen'
      leaveTo='max-h-0'
    >
      {children}
    </Transition>
  )
}

export default ExpandTransition
