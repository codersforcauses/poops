import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

import clsxm from '@/lib/clsxm'

export type UnstyledLinkProps = {
  href: string
  children: ReactNode
  openNewTab?: boolean
  className?: string
  nextLinkProps?: Omit<LinkProps, 'href'>
} & ComponentPropsWithRef<'a'>

const UnstyledLink = forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, href, openNewTab, className, nextLinkProps, ...rest }, ref) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith('/') && !href.startsWith('#')

    if (!isNewTab) {
      return (
        <Link href={href} {...nextLinkProps}>
          <a ref={ref} {...rest} className={className}>
            {children}
          </a>
        </Link>
      )
    }

    return (
      <a
        ref={ref}
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        {...rest}
        className={clsxm('cursor-newtab', className)}
      >
        {children}
      </a>
    )
  }
)

export default UnstyledLink
