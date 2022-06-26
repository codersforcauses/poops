import Link from 'next/link'

type NavLinkProps = {
  href: string
  name: string
  icon: JSX.Element
  currentPage: boolean
  setCurrentPage: (name: string) => unknown
}

export default function NavLink({
  href,
  name,
  icon,
  currentPage,
  setCurrentPage
}: NavLinkProps) {
  const tabClasses =
    'inline-block w-full justify-center pt-2 pb-1 text-center hover:text-poops-red'
  const currentTabClasses = tabClasses + ' border-t-2 border-t-poops-red'

  return (
    <Link href={href}>
      <a
        className={currentPage ? currentTabClasses : tabClasses}
        onClick={() => setCurrentPage(name)}
      >
        {icon}
        <span className='tab tab-home block text-xs'>{name}</span>
      </a>
    </Link>
  )
}
