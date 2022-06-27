import Image from 'next/image'

type ContactItemProps = {
  userid: string
  name: string
  image: JSX.Element
}

const ContactItem = ({ userid, name, image }: ContactItemProps) => {
  return (
    <>
      <li className='bg-white p-3 px-5 hover:bg-grey focus:bg-grey sm:py-4'>
        <div className='flex items-center space-x-4'>
          <Image
            className='h-2 w-2 rounded-full'
            {/*This is a placeholder image*/}
            src='https://zachmanson.com/images/sitting.jpeg'
            alt='Neil image'
            width={50}
            height={50}
            layout='fixed'
          />
          <div className='min-w-0 flex-1'>
            <p className='text-gray-900 truncate text-sm font-medium'>{name}</p>
          </div>
        </div>
      </li>
    </>
  )
}

export default ContactItem
