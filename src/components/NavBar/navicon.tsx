import Image from 'next/image'

import Button from '../Button/Button_component'
type CurrentPageProp = {
  currentPage: string
}
export const NavIcon = ({ currentPage }: CurrentPageProp) => {
  const buttonStyle =
    'fixed bottom-1 z-10 h-16 w-16 rounded-full border-8 bg-primary'
  const inactiveButtonStyle = buttonStyle + ' border-dark-red'
  const activeButtonStyle = buttonStyle + ' border-primary'

  return (
    <div className='flex justify-center'>
      <Button
        attribute={
          currentPage === 'Visit' ? activeButtonStyle : inactiveButtonStyle
        }
        icon={<Image alt='dog-icon' src='/images/dog-icon.png' layout='fill' />}
      />
    </div>
  )
}
