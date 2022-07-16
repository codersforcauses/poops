import Link from 'next/link'

import Avatar from '@/components/Contact/avatar'
import type { Contact } from '@/types/types'

type ProfileItemProps = {
  profile: Contact
  image: string
}

const ProfileItem = ({ profile, image }: ProfileItemProps) => {
  return (
    <Link href={`/contact/${profile.id}`}>
      <a>
        <div className='mt-1 flex-col'>
          <ul>
            <li className='border-grey hover:bg-grey focus:bg-grey border-b bg-white p-3 px-5 sm:py-4'>
              <div className='flex items-center space-x-4'>
                {/* USER PROFILE IMAGE */}
                <Avatar
                  image={image}
                  height={40}
                  width={40}
                  iconClass='h-16 w-16'
                />
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
  )
}

export default ProfileItem
