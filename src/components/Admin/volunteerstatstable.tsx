import { Timestamp } from 'firebase/firestore'

import Spinner from '@/components/UI/loadingSpinner'
import { useVolunteerStatsByDateRange } from '@/hooks/admin'

const headers = [
  'Number of Clients',
  'Number of Visits',
  'Walk Duration (mins)',
  'Walk Distance (kms)',
  'Commute Distance (kms)'
]

const VoluteerStatsTable = () => {
  const startTime = Timestamp.fromDate(new Date('2023-01-22T18:23'))
  const endTime = Timestamp.fromDate(new Date())

  const { isLoading, data: volunteerStats } = useVolunteerStatsByDateRange(
    startTime,
    endTime
  )

  if (isLoading || volunteerStats === undefined)
    return (
      <div className='flex h-20 items-center justify-center'>
        <Spinner style='h-10 w-10 fill-primary-dark text-gray-200' />
      </div>
    )

  const totalStats = [
    0, // total client count
    volunteerStats.totalVisitCount,
    volunteerStats.totalWalkTime,
    volunteerStats.totalWalkDistance,
    volunteerStats.totalCommuteDistance
  ]

  const avgStats = [
    volunteerStats.avgClientCount,
    volunteerStats.avgVisitCount,
    volunteerStats.avgWalkTime,
    volunteerStats.avgWalkDistance,
    volunteerStats.avgCommuteDistance
  ]

  return (
    <div className='rounded-lg py-4 px-5 text-center sm:py-4'>
      <table className='w-full border-collapse border-spacing-2 border-8 border-gray-300'>
        <thead>
          <tr>
            <th className=''></th>
            {headers.map((header) => (
              <th
                key={header}
                className='border-4 border-gray-300 p-6 text-2xl font-extrabold'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className='border-4 border-gray-300 p-6 text-2xl font-extrabold'>
              Total
            </th>
            {totalStats.map((stat) => (
              <td
                key={stat}
                className='border-4 border-gray-300 p-10 text-3xl font-extrabold text-primary-dark'
              >
                {stat}
              </td>
            ))}
          </tr>
          <tr>
            <th className='border-4 border-gray-300 p-6 text-2xl font-extrabold'>
              Average (per volunteer)
            </th>
            {avgStats.map((stat) => (
              <td
                key={stat}
                className='border-4 border-gray-300 p-10 text-3xl font-extrabold text-primary-dark'
              >
                {stat}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className='mt-4 flex items-baseline gap-2 p-2 text-3xl'>
        <div>Total Number of Volunteers: </div>
        <div className='text-primary-dark'>{volunteerStats.volunteerCount}</div>
      </div>
    </div>
  )
}

export default VoluteerStatsTable
