type NavLinkProps = {
  href: string
  name: string
  icon: JSX.Element
}

export default function NavLink({ href, name, icon }: NavLinkProps) {
  return (
    <a
      href={href}
      className='inline-block w-full justify-center pt-2 pb-1 text-center hover:text-poops-red'
    >
      {icon}
      <span className='tab tab-home block text-xs'>{name}</span>
    </a>
  )
}
