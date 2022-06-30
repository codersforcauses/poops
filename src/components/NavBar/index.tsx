import { useState } from 'react'
import {
  ChatAltIcon,
  ExclamationCircleIcon,
  HomeIcon,
  UserIcon
} from '@heroicons/react/outline'

import { NavIcon } from '@/components/NavBar/navicon'
import NavLink from '@/components/NavBar/navlink'

export default function NavBar() {
  const [currentPage, setCurrentPage] = useState('Home')
  const iconClasses = 'inline-block h-7 w-8 hover:text-poops-red'

  const linkDetails = [
    { name: 'Home', route: '/', icon: <HomeIcon className={iconClasses} /> },
    {
      name: 'Contact',
      route: '/contact',
      icon: <ChatAltIcon className={iconClasses} />
    },
    {
      name: 'Visit',
      route: '/visit',
      icon: <NavIcon currentPage={currentPage} />
    },
    {
      name: 'Incidents',
      route: '/incidents',
      icon: <ExclamationCircleIcon className={iconClasses} />
    },
    {
      name: 'Profile',
      route: '/profile',
      icon: <UserIcon className={iconClasses} />
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