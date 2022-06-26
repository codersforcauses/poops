import { useState } from 'react'
import {
  ChatAltIcon,
  ExclamationCircleIcon,
  HomeIcon,
  LocationMarkerIcon
} from '@heroicons/react/outline'

import { NavIcon } from '@/components/navBar/NavIcon'
import NavLink from '@/components/navBar/NavLink'

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

  return (
    <div className='h-16 w-full justify-center'>
      <nav
        id='bottom-navigation'
        className='fixed inset-x-0 bottom-0 z-10 block bg-white shadow'
      >
        <div id='tabs' className='flex justify-between'>
          <NavLink
            href={linkDetails[0].href}
            name={linkDetails[0].name}
            currentPage={linkDetails[0].name === currentPage}
            setCurrentPage={setCurrentPage}
            icon={linkDetails[0].icon}
          />
          <NavLink
            href={linkDetails[1].href}
            name={linkDetails[1].name}
            currentPage={linkDetails[1].name === currentPage}
            setCurrentPage={setCurrentPage}
            icon={linkDetails[1].icon}
          />
          <NavIcon />
          <NavLink
            href={linkDetails[2].href}
            name={linkDetails[2].name}
            currentPage={linkDetails[2].name === currentPage}
            setCurrentPage={setCurrentPage}
            icon={linkDetails[2].icon}
          />
          <NavLink
            href={linkDetails[3].href}
            name={linkDetails[3].name}
            currentPage={linkDetails[3].name === currentPage}
            setCurrentPage={setCurrentPage}
            icon={linkDetails[3].icon}
          />
        </div>
      </nav>
    </div>
  )
}
