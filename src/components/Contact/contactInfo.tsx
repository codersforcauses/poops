import { UserCircleIcon } from '@heroicons/react/outline'
import data from 'mockData/CONTACT_DATA.json'
import tw from 'tailwind-styled-components'

function ContactInfo() {
  const currentUser = data[0]
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <UserCircleIcon className='w-32 rounded-full' />

      <h1 className='text-4xl font-normal'>
        {currentUser.first_name} {currentUser.last_name}
      </h1>
      <h3>{currentUser.notes}</h3>

      <Box>
        <h3>Phone</h3>
        <p className='text-xl text-poops-red'>{currentUser.phone}</p>
      </Box>
      <Box>
        <h3>Email</h3>
        <p className='text-xl text-poops-red'>{currentUser.email}</p>
      </Box>
      <Box>
        <h3>Address</h3>
        <p className='text-xl text-poops-red'>{currentUser.street_address}</p>
      </Box>
      <Box>
        <h3>Tags</h3>
        <div className='h-auto bg-white bg-opacity-100'>
          Tags
          <br />
          Hello
          <br />
          Hi
          <br />{' '}
        </div>
        {/* This should be done as a react component i think? */}
        <label>
          <input type='checkbox' /> Client
        </label>
        <br />
        <label>
          <input type='checkbox' /> Coordinator
        </label>
        <br />
        <label>
          <input type='checkbox' /> Volunteer
        </label>
      </Box>
      <Box>
        <h3>Region </h3>
      </Box>
      <Box>
        <h3>Pets </h3>
        <p className='text-xl text-poops-red'>{currentUser.pets}</p>
      </Box>
      <Box>Notes</Box>
    </div>
  )
}

export default ContactInfo

const Box = tw.div`
    bg-grey
    bg-opacity-20
    box-content
    w-80
    rounded-lg
    border-2
    px-3
    py-1
`
