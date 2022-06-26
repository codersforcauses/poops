import { useState } from 'react'
import {
  ChatAltIcon,
  ExclamationCircleIcon,
  HomeIcon,
  LocationMarkerIcon
} from '@heroicons/react/outline'

import { NavIcon } from '@/components/avBar/NavIcon'
import NavLink from '@/components/avBar/NavLink'

export default function NavBar() {
  const [currentPage, setCurrentPage] = useState('Home')
  const iconClasses = 'inline-block h-7 w-8 hover:text-poops-red'

  const linkDetails = [
    { name: 'Home', href: '#', icon: <HomeIcon className={iconClasses} /> },
    {
      name: 'Contact',
      href: '#',
      icon: <ChatAltIcon className={iconClasses} />
    },
    {
      name: 'Visit',
      href: '#',
      icon: <LocationMarkerIcon className={iconClasses} />
    },
    {
      name: 'Incidents',
      href: '#',
      icon: <ExclamationCircleIcon className={iconClasses} />
    }
  ]

  const navLinks = linkDetails.map((link) => {
    return (
      <NavLink
        href={link.href}
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
        <div className='flex justify-between'>
          {navLinks[0]}
          {navLinks[1]}
          <NavIcon />
          {navLinks[2]}
          {navLinks[3]}
        </div>
      </nav>
    </div>
  )
}
