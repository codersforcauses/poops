import Image from 'next/legacy/image'

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
      <button
        className={
          currentPage === 'Visit' ? activeButtonStyle : inactiveButtonStyle
        }
      >
        <Image alt='dog-icon' src='/images/dog-icon.png' layout='fill' />
      </button>
    </div>
  )
}
