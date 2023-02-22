import { useRef } from 'react'
import { Timestamp } from 'firebase/firestore'

import Statistics from '@/components/Home/statistics'
import Card from '@/components/UI/card'
import Spinner from '@/components/UI/loadingSpinner'
import { useVolunteerStatsByDateRange } from '@/hooks/admin'

const WEEK_IN_MS = 604800000

interface StatsBreakdownProps {
  days?: number
}

const StatsBreakdown = ({ days = 7 }: StatsBreakdownProps) => {
  const now = useRef(Date.now())
  const weekOldTimestamp = Timestamp.fromMillis(now.current - WEEK_IN_MS)
  const { isLoading, data } = useVolunteerStatsByDateRange(
    '7DaySummary',
    weekOldTimestamp,
    Timestamp.fromDate(new Date(now.current))
  )

  return (
    <div className='px-4'>
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
                    data={`${data.avgVisitCount}`}
                    tooltip={`Total: ${data.totalVisitCount}`}
                  />
                </td>
                <td>
                  <Statistics
                    title='Walk Duration: '
                    data={`${data.avgWalkTime} min`}
                    tooltip={`Total: ${data.totalWalkTime} min`}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Statistics
                    title='Walk Distance'
                    data={`${data.avgWalkDistance} km`}
                    tooltip={`Total: ${data.totalWalkDistance} km`}
                  />
                </td>
                <td>
                  <Statistics
                    title='Commute Distance'
                    data={`${data.avgCommuteDistance} km`}
                    tooltip={`Total: ${data.totalCommuteDistance} km`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}

export default StatsBreakdown
