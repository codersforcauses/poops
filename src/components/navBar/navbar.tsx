import {
  mdiClipboardAlertOutline,
  mdiHomeOutline,
  mdiMapMarkerOutline,
  mdiMessageProcessingOutline
} from '@mdi/js'

import NavLink from '@/components/navBar/NavLink'

const NavBar = () => {
  return (
    <div className='w-full'>
      <section
        id='bottom-navigation'
        className='fixed inset-x-0 bottom-0 z-10 block bg-white shadow'
      >
        <div id='tabs' className='flex justify-between'>
          <NavLink href='#' name='Home' icon={mdiHomeOutline} />
          <NavLink href='#' name='Contact' icon={mdiMessageProcessingOutline} />
          <NavLink href='#' name='Visit' icon={mdiMapMarkerOutline} />
          <NavLink href='#' name='Incidents' icon={mdiClipboardAlertOutline} />
        </div>
      </section>
    </div>
  )
}

export default NavBar
