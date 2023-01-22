import { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'

type NavLinkProps = {
  href: string
  name: string
  icon: JSX.Element
  currentPage: boolean
  setCurrentPage: Dispatch<SetStateAction<string>>
}

export default function NavLink({
  href,
  name,
  icon,
  currentPage,
  setCurrentPage
}: NavLinkProps) {
  const tabClasses =
    'inline-block w-full justify-center text-center hover:text-primary'
  const currentTabClasses = tabClasses + ' border-t-2 border-t-primary'

  return (
    <Link href={href}>
      {name !== 'Visit' ? (
        <a
          className={`${
            currentPage ? currentTabClasses : tabClasses
          } pt-2 pb-1`}
          onMouseDown={() => setCurrentPage(name)}
          aria-hidden='true' // TODO: need work on accessibility
        >
          {icon}
          <span className='tab tab-home block text-xs'>{name}</span>
        </a>
      ) : (
        <a
          onMouseDown={() => setCurrentPage(name)}
          aria-hidden='true' // TODO: need work on accessibility
        >
          {icon}
        </a>
      )}
    </Link>
  )
}

