import { cva, VariantProps } from 'class-variance-authority'

const variants = cva(['rounded-lg', 'font-semibold', 'drop-shadow-default'], {
  variants: {
    intent: {
      primary: [
        'bg-primary',
        'text-white',
        'active:bg-primary-dark',
        'hover:bg-primary-dark',
        'disabled:bg-gray-500'
      ],
      secondary: [
        'bg-white',
        'text-gray-800',
        'border',
        'border-gray-400',
        'hover:bg-gray-100'
      ]
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4'],
      large: ['text-lg', 'py-4', 'px-8']
    },
    fullwidth: {
      true: 'w-full'
    }
  },
  defaultVariants: {
    intent: 'primary',
    size: 'large'
  }
})

type ButtonProps = VariantProps<typeof variants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  className,
  intent,
  fullwidth,
  size,
  ...props
}: ButtonProps) => (
  <button
    className={variants({ className, fullwidth, intent, size })}
    {...props}
  />
)

export default Button
