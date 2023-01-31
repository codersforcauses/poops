import { Timestamp } from 'firebase/firestore'

import Statistics from '@/components/Home/statistics'
import Card from '@/components/UI/card'
import Spinner from '@/components/UI/loadingSpinner'
import { useVolunteerStatsByDateRange } from '@/hooks/admin'

interface StatsBreakdownProps {
  days?: number
}

const StatsBreakdown = ({ days = 7 }: StatsBreakdownProps) => {
  const WEEK_IN_MS = 604800000
  const now = Date.now()
  const weekOldTimestamp = Timestamp.fromMillis(now - WEEK_IN_MS)
  const { isLoading, data } = useVolunteerStatsByDateRange(
    weekOldTimestamp,
    Timestamp.fromDate(new Date(now))
  )

  // if (isLoading || data === undefined)
  //   return <div className='flex h-20 items-center justify-center'></div>

  return (
    <Card title={`${days} Day Breakdown (Average per Volunteer)`}>
      {isLoading || data === undefined ? (
        <Spinner style='h-10 w-10 fill-primary-dark text-gray-200 m-4' />
      ) : (
        <table className='w-full'>
          <tbody>
            <tr>
              <td>
                <Statistics
                  title='Visits'
                  data={data.avgVisitCount.toString()}
                />
              </td>
              <td>
                <Statistics
                  title='Walk Duration: '
                  data={data.avgWalkTime.toString()}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Statistics
                  title='Walk Distance'
                  data={data.avgWalkDistance.toString()}
                />
              </td>
              <td>
                <Statistics
                  title='Commute Distance'
                  data={data.avgCommuteDistance.toString()}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </Card>
  )
}

export default StatsBreakdown
