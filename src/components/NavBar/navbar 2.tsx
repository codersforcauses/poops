import { mdiHome } from '@mdi/js';
import Icon from '@mdi/react';

const NavBar = () => {
  return (
    <div>
      <Icon path={mdiHome}
        size={1}
        horizontal
        vertical
        rotate={90}
        color="red"/>
    </div>
  )
}

export default NavBar