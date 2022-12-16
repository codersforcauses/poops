import AdminPage from '@/components/Admin/AdminPage/adminPage'
import Summary from '@/components/Admin/Stats/summary'

const dummyUsername = 'Admin'

const Stats = () => {
  return (
    <AdminPage title={`Welcome ${dummyUsername}!`} content={<Summary />} />
  )
}

export default Stats
