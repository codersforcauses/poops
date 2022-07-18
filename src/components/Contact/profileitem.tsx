import Link from 'next/link'

import Avatar from '@/components/Contact/avatar'
import type { ContactData } from '@/types/types'

type ProfileItemProps = {
  profile: ContactData
  image: string
}

const ProfileItem = ({ profile, image }: ProfileItemProps) => {
  return (
    <Link href={`/contact/${profile.id}`}>
      <a>
        <div className='mt-1 flex-col'>
          <ul>
            <li className='border-b border-gray-300 bg-white p-3 px-5 hover:bg-gray-300 focus:bg-gray-300 sm:py-4'>
              <div className='flex items-center space-x-4'>
                {/* USER PROFILE IMAGE */}
                <Avatar
                  image={image}
                  height={40}
                  width={40}
                  iconClass='h-16 w-16'
                />
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium text-gray-900'>
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
