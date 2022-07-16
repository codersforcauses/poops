import React from 'react'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/outline'

type AvatarProps = {
  image: string
  height: number
  width: number
  iconClass: string
}
const Avatar = ({ image, height, width, iconClass }: AvatarProps) => {
  return (
    <>
      {image === '' ? (
        <UserCircleIcon className={iconClass} />
      ) : (
        <Image
          className='h-2 w-2 rounded-full'
          src={image}
          alt='Profile Image'
          width={width}
          height={height}
          layout='fixed'
        />
      )}
    </>
  )
}

export default Avatar
