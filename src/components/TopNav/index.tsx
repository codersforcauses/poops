import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/UI/button'
import { useAuth } from '@/context/Firebase/Auth/context'

function TopNav() {
  const { isAdmin } = useAuth()
  return (
    <div className='h-16 w-full'>
      <nav
        id='top-navigation'
        className='fixed inset-x-0 top-0 z-10 block h-16 bg-white'
      >
        <div className='flex justify-between'>
          <Image alt='logo' src='/images/logo.png' width={100} height={64} />
          {isAdmin && (
            <Link href='admin/'>
              <Button size='small' intent='secondary'>
                Admin Page
              </Button>
            </Link>
          )}
        </div>
        <hr className='mb-3 h-0.5 border-primary-dark bg-primary-dark text-primary-dark' />
      </nav>
    </div>
  )
}

export default TopNav
