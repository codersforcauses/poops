import Image from 'next/image'

function TopNav() {
  return (
    <div className='h-16 w-full justify-center'>
      <nav
        id='top-navigation'
        className='fixed inset-x-0 top-0 z-10 block bg-white'
      >
        <div className='flex justify-between'>
          <Image alt='logo' src='/images/logo.png' width='90px' height='55px' />
        </div>
        <hr
          style={{
            background: 'red',
            color: 'red',
            borderColor: 'red',
            height: '3px',
          }}
        />
      </nav>
    </div>
  );
}


export default TopNav