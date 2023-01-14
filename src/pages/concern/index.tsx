import Link from 'next/link'

import Header from '@/components/Header'
import Summary from '@/components/Home/summary'
import NavBar from '@/components/NavBar'
import { withProtected } from '@/components/PrivateRoute'
import TopNav from '@/components/TopNav'
import Button from '@/components/UI/button'
import { useAuth } from '@/context/Firebase/Auth/context'
import mod from '@/lib/temp/firebase/functions/setRole'

const Concern = () => {
  return <>WIP</>
  /*/vet_concerns
  /{vet_concern}
    - user_uid: string
    - user_name: string
    - user_email: string
    - user_phone: integer
    - client_name: string
    - pet_name: string
    - visit_time: timestamp
    - visit_id: string
    - detail: string
    - created_at: timestamp*/
}

export default withProtected(Concern)
