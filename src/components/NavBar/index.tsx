import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  ChatBubbleLeftEllipsisIcon,
  HomeIcon
} from '@heroicons/react/24/outline'

import { NavIcon } from '@/components/NavBar/navicon'
import NavLink from '@/components/NavBar/navlink'

export default function NavBar() {
  // Gets top level path, capitalises first letter
  const { asPath } = useRouter()
  const pathStart = asPath.split('/')[1]
  const currentPageTitle =
    pathStart === ''
      ? 'Home'
      : `${pathStart.charAt(0).toUpperCase()}${pathStart
          .slice(1)
          .toLowerCase()}`

  const [currentPage, setCurrentPage] = useState(currentPageTitle)
  const iconClasses = 'inline-block h-7 w-8 hover:text-primary'

  const linkDetails = [
    { name: 'Home', route: '/', icon: <HomeIcon className={iconClasses} /> },

    {
      name: 'Contact',
      route: '/contact',
      icon: <ChatBubbleLeftEllipsisIcon className={iconClasses} />
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

  const visitLinkDetail = {
    name: 'Visit',
    route: '/visit',
    icon: <NavIcon currentPage={currentPage} />
  }

  const visitNavLink = (
    <NavLink
      href={visitLinkDetail.route}
      name={visitLinkDetail.name}
      key={visitLinkDetail.name}
      currentPage={visitLinkDetail.name === currentPage}
      setCurrentPage={setCurrentPage}
      icon={visitLinkDetail.icon}
    />
  )

  return (
    <div className='h-16 w-full'>
      <nav
        id='bottom-navigation'
        className='fixed inset-x-0 bottom-0 z-10 block h-20 bg-white shadow'
      >
        {visitNavLink}
        <div className='flex justify-between'>{navLinks}</div>
      </nav>
    </div>
  )
}
