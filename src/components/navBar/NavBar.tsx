import {
  ChatAltIcon,
  ExclamationCircleIcon,
  HomeIcon,
  LocationMarkerIcon
} from '@heroicons/react/outline'

import NavLink from '@/components/navBar/NavLink'

export default function NavBar() {
  const iconClasses = 'inline-block h-7 w-8 hover:text-poops-red'

  return (
    <div className='h-14 w-full'>
      <section
        id='bottom-navigation'
        className='fixed inset-x-0 bottom-0 z-10 block bg-white shadow'
      >
        <div id='tabs' className='flex justify-between'>
          <NavLink
            href='#'
            name='Home'
            icon={<HomeIcon className={iconClasses} />}
          />
          <NavLink
            href='#'
            name='Contact'
            icon={<ChatAltIcon className={iconClasses} />}
          />
          <NavLink
            href='#'
            name='Visit'
            icon={<LocationMarkerIcon className={iconClasses} />}
          />
          <NavLink
            href='#'
            name='Incidents'
            icon={<ExclamationCircleIcon className={iconClasses} />}
          />
        </div>
      </section>
    </div>
  )
}
