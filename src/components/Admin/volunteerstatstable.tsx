import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Timestamp } from 'firebase/firestore'

import Spinner from '@/components/UI/loadingSpinner'
import Tooltip from '@/components/UI/tooltip'
import FormField from '@/components/Visit/formfield'
import { useVolunteerStatsByDateRange } from '@/hooks/admin'
import { formatTimestamp } from '@/utils'

const YEAR_IN_MS = 31556952000
const QUERY_KEY = 'mainVolunteerStatsTable'

const headers = [
  'Number of Visits',
  'Walk Duration (mins)',
  'Walk Distance (kms)',
  'Commute Distance (kms)'
]

const VolunteerStatsTable = () => {
  const queryClient = useQueryClient()

  const now = Date.now()
  const yearOldTimestamp = Timestamp.fromMillis(now - YEAR_IN_MS)

  const [toTime, setToTime] = useState(
    formatTimestamp(Timestamp.fromMillis(now))
  )
  const [fromTime, setFromTime] = useState(formatTimestamp(yearOldTimestamp))

  const startTime = yearOldTimestamp
  const endTime = Timestamp.fromMillis(now)

  const { isLoading, data: volunteerStats } = useVolunteerStatsByDateRange(
    startTime,
    endTime,
    QUERY_KEY
  )

  const totalStats = [
    volunteerStats?.totalVisitCount,
    volunteerStats?.totalWalkTime,
    volunteerStats?.totalWalkDistance,
    volunteerStats?.totalCommuteDistance
  ]

  const avgStats = [
    volunteerStats?.avgVisitCount,
    volunteerStats?.avgWalkTime,
    volunteerStats?.avgWalkDistance,
    volunteerStats?.avgCommuteDistance
  ]

  const refetchStats = () => {
    if (fromTime !== null && toTime !== null) {
      // ! have to invalidate queries as staleTime and cacheTimes are infinite.
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY]
      })
    }
  }

  return (
    <div className='rounded-lg py-4 px-5 text-center sm:py-4'>
      {isLoading || volunteerStats === undefined ? (
        <div className='flex justify-center'>
          <Spinner style='h-10 w-10 fill-primary-dark text-gray-200 m-4' />
        </div>
      ) : (
        <>
          <table className='w-full border-collapse border-spacing-2 border-8 border-primary-dark'>
            <thead>
              <tr>
                <th>
                  <div className='flex flex-row content-center justify-evenly'>
                    <div className='flex flex-row content-center '>
                      <p className='my-auto'>From: </p>
                      <FormField
                        className='col-span-2 ml-2'
                        id='fromTimeInput'
                        type='dateTime-local'
                        placeholder=''
                        value={fromTime ? fromTime : undefined}
                        label=''
                        isRequired={false}
                        onChange={(event) => {
                          event.target.value = event.target.value.substring(
                            0,
                            16
                          ) // fixes invalid input on ios safari? can't test
                          setFromTime(event.target.value)
                        }}
                      />
                    </div>
                    <div className='flex flex-row content-center '>
                      <p className='my-auto'>To: </p>
                      <FormField
                        className='col-span-2 ml-2'
                        id='toTimeInput'
                        type='dateTime-local'
                        placeholder=''
                        value={toTime ? toTime : undefined}
                        label=''
                        isRequired={false}
                        onChange={(event) => {
                          event.target.value = event.target.value.substring(
                            0,
                            16
                          ) // fixes invalid input on ios safari? can't test
                          setToTime(event.target.value)
                          refetchStats()
                        }}
                      />
                    </div>
                  </div>
                </th>
                {headers.map((header) => (
                  <th
                    key={header}
                    className='border-4 border-primary-dark p-6 text-xl font-normal'
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className='border-4 border-primary-dark p-6 text-xl font-normal'>
                  Total
                </th>
                {totalStats.map((stat) => (
                  <td
                    key={stat}
                    className='border-4 border-primary-dark p-10 text-3xl text-primary-dark'
                  >
                    {stat}
                  </td>
                ))}
              </tr>
              <tr>
                <th className='border-4 border-primary-dark p-6 text-xl font-normal'>
                  Average (per volunteer)
                </th>
                {avgStats.map((stat) => (
                  <td
                    key={stat}
                    className='border-4 border-primary-dark p-10 text-3xl text-primary-dark'
                  >
                    {stat}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </>
      )}
      <div className='mt-4 flex items-baseline gap-2 p-2 text-3xl'>
        <div>Total Number of Volunteers: </div>
        <div className='text-primary-dark'>
          {volunteerStats?.volunteerCount}
        </div>
      </div>
    </div>
  )
}

export default VolunteerStatsTable
