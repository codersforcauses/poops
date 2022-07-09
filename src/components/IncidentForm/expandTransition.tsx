import { Transition } from '@headlessui/react'

type TransitionProps = {
  isExpanded: boolean
  children: JSX.Element
}
const ExpandTransition: React.FC<TransitionProps> = ({
  isExpanded,
  children
}) => {
  return (
    <Transition
      show={isExpanded}
      className='overflow-y-hidden'
      enter='duration-500 opacity'
      enterFrom='max-h-0 h-0'
      enterTo='max-h-screen h-full'
      leave='transition duration-300 ease-out'
      leaveFrom='max-h-screen h-full'
      leaveTo='max-h-0 h-0'
    >
      {children}
    </Transition>
  )
}

export default ExpandTransition
