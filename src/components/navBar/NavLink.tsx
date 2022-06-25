import { useState } from 'react'
import Icon from '@mdi/react'

type NavLinkProps = {
  href: string
  name: string
  icon: string
}

export default function NavLink({ href, name, icon }: NavLinkProps) {
  const [isHighlighted, setIsHighlighted] = useState(false)

  const color = isHighlighted ? 'var(--poops-red)' : 'black'

  return (
    <a
      href={href}
      className='inline-block w-full justify-center pt-2 pb-1 text-center hover:text-poops-red'
      onMouseEnter={() => setIsHighlighted(true)}
      onMouseLeave={() => setIsHighlighted(false)}
    >
      <Icon
        className='mb-1 inline-block'
        path={icon}
        size={1}
        vertical={false}
        color={color}
      />

      <span className='tab tab-home block text-xs'>{name}</span>
    </a>
  )
}
