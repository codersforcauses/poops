import Image from 'next/image'
import Link from 'next/link'
import { UserCircleIcon } from '@heroicons/react/outline'

import type { Contact } from '@/types/types'

type ProfileItemProps = {
  profile: Contact
  image: string
}

const ProfileItem = ({ profile, image }: ProfileItemProps) => {
  return (
    <>
      <Link href={`/contact/${profile.id}`}>
        <a>
          <div className='mt-1 flex-col'>
            <ul>
              <li className='border-b border-grey bg-white p-3 px-5 hover:bg-grey focus:bg-grey sm:py-4'>
                <div className='flex items-center space-x-4'>
                  {/* This is a placeholder image */}
                  {image === '' ? (
                    <UserCircleIcon className='h-16 w-16' />
                  ) : (
                    <Image
                      className='h-2 w-2 rounded-full'
                      src={image}
                      alt='Profile Image'
                      width={48}
                      height={48}
                      layout='fixed'
                    />
                  )}
                  <div className='min-w-0 flex-1'>
                    <p className='text-gray-900 truncate text-sm font-medium'>
                      Me
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </a>
      </Link>
    </>
  )
}

export default ProfileItem
