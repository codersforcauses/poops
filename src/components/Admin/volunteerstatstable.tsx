import { FormEvent, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Timestamp } from 'firebase/firestore'

import Button from '@/components/UI/button'
import Card from '@/components/UI/card'
import Spinner from '@/components/UI/loadingSpinner'
import FormField from '@/components/Visit/formfield'
import { useVolunteerStatsByDateRange } from '@/hooks/admin'
import { formatTimestamp } from '@/utils'

const YEAR_IN_MS = 31556952000
const queryKey = 'mainVolunteerStatsTable'

const headers = [
  'Number of Visits',
  'Walk Duration (mins)',
  'Walk Distance (kms)',
  'Commute Distance (kms)'
]

const VolunteerStatsTable = () => {
  const queryClient = useQueryClient()
  const now = Date.now()

  const start = Timestamp.fromMillis(now - YEAR_IN_MS)
  const end = Timestamp.fromMillis(now)

  const [startTime, setStartTime] = useState(formatTimestamp(start) || '')
  const [endTime, setEndTime] = useState(formatTimestamp(end) || '')

  const [from, setFrom] = useState<Timestamp>(
    Timestamp.fromDate(new Date(startTime))
  )
  const [to, setTo] = useState<Timestamp>(Timestamp.fromDate(new Date(endTime)))

  const { isLoading, data: volunteerStats } = useVolunteerStatsByDateRange(
    queryKey,
    from,
    to
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
    if (startTime !== null && endTime !== null) {
      // ! have to invalidate queries as staleTime and cacheTimes are infinite.
      // queryClient.invalidateQueries({
      //   type: 'inactive',
      //   predicate: (q) => {
      //     return q.queryKey[0] === queryKey
      //   }
      // })
      queryClient.removeQueries({
        type: 'inactive',
        predicate: (q) => {
          return q.queryKey[0] === queryKey
        }
      })
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: prevent submission for startTime after endTime
    setFrom(Timestamp.fromDate(new Date(startTime)))
    setTo(Timestamp.fromDate(new Date(endTime)))
    refetchStats()
  }

  return (
    <div className='m-4 rounded-lg'>
      <Card title='Stats Table'>
        <div className='flex flex-col gap-4'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-row justify-center gap-4 p-2 text-left'>
              <FormField
                className='col-span-2 m-2'
                id='fromTimeInput'
                type='dateTime-local'
                placeholder=''
                value={startTime}
                label='From:'
                isRequired={false}
                onChange={(event) => {
                  event.target.value = event.target.value.substring(0, 16) // fixes invalid input on ios safari? can't test
                  setStartTime(event.target.value)
                }}
              />
              <FormField
                className='col-span-2 m-2'
                id='toTimeInput'
                type='dateTime-local'
                placeholder=''
                value={endTime}
                label='To:'
                isRequired={false}
                onChange={(event) => {
                  event.target.value = event.target.value.substring(0, 16) // fixes invalid input on ios safari? can't test
                  setEndTime(event.target.value)
                }}
              />
            </div>
            <div className='flex justify-center'>
              <Button
                className='m-2 cursor-pointer self-end text-black'
                type='submit'
                size='large'
              >
                Submit
              </Button>
            </div>
          </form>

          {isLoading ? (
            <div className='flex justify-center'>
              <Spinner style='h-10 w-10 fill-primary-dark text-gray-200 m-4' />
            </div>
          ) : (
            <div className='w-full text-center'>
              <table className='border-4 border-primary-dark'>
                <thead>
                  <tr>
                    <th />
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
                    {totalStats.map((stat, i) => (
                      <td
                        key={`${i}:${stat}`}
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
            </div>
          )}
        </div>
      </Card>

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
