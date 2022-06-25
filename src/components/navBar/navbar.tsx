import { mdiHome } from '@mdi/js'

import NavLink from '@/components/navBar/NavLink'

const NavBar = () => {
  return (
    <div className='h-screen w-full'>
      <section
        id='bottom-navigation'
        className='fixed inset-x-0 bottom-0 z-10 block bg-white shadow'
      >
        <div id='tabs' className='flex justify-between'>
          <NavLink href='#' name='Home' icon={mdiHome} />
        </div>
      </section>
    </div>
  )
}

export default NavBar
