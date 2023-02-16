import Statistics from '@/components/Home/statistics'
import Card from '@/components/UI/card'
import Spinner from '@/components/UI/loadingSpinner'
import useUser from '@/hooks/user'

function Summary() {
  const { isLoading, isSuccess, data: currentUser } = useUser()
  if (isLoading)
    return (
      <Card title='Summary Dashboard'>
        <Spinner style='w-10 h-10 fill-primary-dark text-gray-200 m-4' />
      </Card>
    )
  if (!isSuccess || currentUser == undefined || currentUser.stats == undefined)
    return null

  const {
    stats: { numHours, numVisits, commutedDist, walkedDist }
  } = currentUser

  return (
    <Card title='Summary Dashboard' fullWidth>
      <table className='w-full'>
        <tbody>
          <tr>
            <td className='pr-2'>
              <Statistics
                title='Number of Visits'
                data={numVisits.toString()}
              />
            </td>
            <td className='pl-2'>
              <Statistics title='Distance Walked' data={walkedDist + ' km'} />
            </td>
          </tr>
          <tr>
            <td className='pr-2'>
              <Statistics title='Number of Hours' data={numHours.toString()} />
            </td>
            <td className='pl-2'>
              <Statistics
                title='Distance Commuted'
                data={commutedDist + ' km'}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}

export default Summary
