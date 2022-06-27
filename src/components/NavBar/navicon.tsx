import React from 'react'
import Image from 'next/image'

export const NavIcon = () => {
  return (
    <div className='flex w-80 justify-center'>
      <div className='fixed bottom-1 z-10 h-16 w-16 rounded-full border-8 border-poops-dark-red bg-poops-red'>
        <Image alt='dog-icon' src='/images/dog-icon.png' layout='fill' />
      </div>
    </div>
  )
}
