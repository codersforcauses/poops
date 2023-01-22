import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChatBubbleLeftEllipsisIcon, HomeIcon} from '@heroicons/react/24/outline'
import { ChatBubbleLeftEllipsisIcon as ChatIconSolid,HomeIcon as HomeIconSolid} from '@heroicons/react/24/solid'

import NavLink from '@/components/NavBar/navlink'

import PoopsSVG from '../../../public/images/poops.svg'
import PoopsSolidSVG from '../../../public/images/poopsSolid.svg'

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
  const iconClasses = 'inline-block h-7 w-8'

  const linkDetails = [
    { 
      name: 'Home', 
      route: '/', 
      icon: <HomeIcon className={iconClasses} />, 
      iconSolid: <HomeIconSolid className={iconClasses} />
    },
    {
      name: 'Visit',
      route: '/visit',
      icon: <Image className={iconClasses} alt='dog-icon' src={PoopsSVG} width='32' height='28' />,
      iconSolid: <Image className={iconClasses} alt='dog-icon' src={PoopsSolidSVG} width='32' height='28' />
    },
    {
      name: 'Contacts',
      route: '/contact',
      icon: <ChatBubbleLeftEllipsisIcon className={iconClasses} />,
      iconSolid: <ChatIconSolid className={iconClasses} />
    },
  ]

  const navLinks = linkDetails.map((link) => {
    return (
   
      <NavLink
        href={link.route}
        name={link.name}
        key={link.name}
        currentPage={link.name === currentPage}
        setCurrentPage={setCurrentPage}
        icon={link.name === currentPage ? link.iconSolid:link.icon}
      />
    )
  })

  return (
    <nav
      id='bottom-navigation'
      className='fixed inset-x-0 bottom-0 z-10 block h-16 w-full bg-white shadow'
    >
    
      <div className='flex justify-between'>
        {navLinks}
      </div>
    </nav>
  )
}
