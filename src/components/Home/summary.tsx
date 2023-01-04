import Statistics from '@/components/Home/statistics'
import useUser from '@/hooks/user'

function Summary() {
  const { isSuccess, data: currentUser } = useUser()

  if (!isSuccess || currentUser == undefined || currentUser.stats == undefined)
    return null

  const {
    stats: { numHours, numVisits, commutedDist, walkedDist }
  } = currentUser

  return (
    <div className='rounded-lg bg-zinc-100 py-4 px-5 text-center shadow-lg sm:py-4'>
      <h1 className='mb-2 text-xl text-primary-dark'>
        <b>Summary Dashboard</b>
      </h1>
      <hr className='h-0.5 border-primary-dark bg-primary-dark text-primary-dark' />
      <div>
        <table className='w-full'>
          <tbody>
            <tr>
              <td>
                <Statistics
                  title='Number of Visits'
                  data={numVisits.toString()}
                />
              </td>
              <td>
                <Statistics title='Distance Walked' data={walkedDist + ' km'} />
              </td>
            </tr>
            <tr>
              <td>
                <Statistics
                  title='Number of Hours'
                  data={numHours.toString()}
                />
              </td>
              <td>
                <Statistics
                  title='Distance Commuted'
                  data={commutedDist + ' km'}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Summary
