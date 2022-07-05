import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ChatAltIcon, HomeIcon } from '@heroicons/react/outline'

import { NavIcon } from '@/components/NavBar/navicon'
import NavLink from '@/components/NavBar/navlink'

export default function NavBar() {
  // Gets top level path, capitalises first letter
  const { asPath } = useRouter()

  const [currentPage, setCurrentPage] = useState('')
  const iconClasses = 'inline-block h-7 w-8 hover:text-primary'

  useEffect(() => {
    const pathStart = asPath.split('/')[1]
    const currentPageTitle =
      pathStart === ''
        ? 'Home'
        : `${pathStart.charAt(0).toUpperCase()}${pathStart
            .slice(1)
            .toLowerCase()}`
    setCurrentPage(currentPageTitle)
  }, [asPath])

  const linkDetails = [
    { name: 'Home', route: '/', icon: <HomeIcon className={iconClasses} /> },
    {
      name: 'Visit',
      route: '/visit',
      icon: <NavIcon currentPage={currentPage} />
    },
    {
      name: 'Contact',
      route: '/contact',
      icon: <ChatAltIcon className={iconClasses} />
    }
  ]

  const navLinks = linkDetails.map((link) => {
    return (
      <NavLink
        href={link.route}
        name={link.name}
        key={link.name}
        currentPage={link.name === currentPage}
        setCurrentPage={setCurrentPage}
        icon={link.icon}
      />
    )
  })

  return (
    <div className='h-16 w-full justify-center'>
      <nav
        id='bottom-navigation'
        className='fixed inset-x-0 bottom-0 z-10 block bg-white shadow'
      >
        <div className='flex justify-between'>{navLinks}</div>
      </nav>
    </div>
  )
}
