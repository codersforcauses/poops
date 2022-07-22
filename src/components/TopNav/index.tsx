import Image from 'next/image'

function TopNav() {
  return (
    <div className='h-16 w-full justify-center'>
      <nav
        id='top-navigation'
        className='fixed inset-x-0 top-0 z-10 block bg-white'
      >
        <div className='flex justify-between'>
          <Image alt='logo' src='/images/logo.png' width='100px' height='65x' />
        </div>
        <hr className='mb-3 h-0.5 border-dark-red bg-dark-red text-dark-red' />
      </nav>
    </div>
  )
}

export default TopNav
