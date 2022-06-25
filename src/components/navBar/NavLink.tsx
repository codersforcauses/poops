import Icon from '@mdi/react'

type NavLinkProps = {
  href: string
  name: string
  icon: string
}

export default function NavLink({ href, name, icon }: NavLinkProps) {
  return (
    <a
      href={href}
      className='inline-block w-full justify-center pt-2 pb-1 text-center hover:text-teal-500 focus:text-teal-500'
    >
      <Icon
        className='mb-1 inline-block'
        path={icon}
        size={2}
        vertical={false}
        color='black'
      />

      <span className='tab tab-home block text-xs'>{name}</span>
    </a>
  )
}
