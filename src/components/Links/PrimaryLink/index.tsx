import { forwardRef } from 'react'

import UnstyledLink, {
  UnstyledLinkProps
} from '@/components/Links/UnstyledLink'
import clsxm from '@/lib/clsxm'

const PrimaryLink = forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'inline-flex items-center',
          'font-medium text-primary-600 hover:text-primary-500',
          'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          className
        )}
      >
        {children}
      </UnstyledLink>
    )
  }
)

export default PrimaryLink
