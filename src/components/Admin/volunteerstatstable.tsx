import { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Timestamp } from 'firebase/firestore'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/UI/button'
import Card from '@/components/UI/card'
import Form from '@/components/UI/FormComponents/Form'
import TextField from '@/components/UI/FormComponents/TextField'
import Spinner from '@/components/UI/loadingSpinner'
import { useVolunteerStatsByDateRange } from '@/hooks/admin'
import { formatTimestamp, requiredMessage } from '@/utils'

interface FormValues {
  fromTime: string
  toTime: string
}

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

  const [from, setFrom] = useState<Timestamp>(start)
  const [to, setTo] = useState<Timestamp>(end)

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
    // ! have to remove queries as staleTime and cacheTimes are infinite.
    queryClient.removeQueries({
      type: 'inactive',
      predicate: (q) => {
        return q.queryKey[0] === queryKey
      }
    })
  }

  const handleSubmit: SubmitHandler<FormValues> = async (
    formData: FormValues
  ) => {
    setFrom(Timestamp.fromDate(new Date(formData.fromTime)))
    setTo(Timestamp.fromDate(new Date(formData.toTime)))
    refetchStats()
  }

  return (
    <div className='m-4 rounded-lg'>
      <Card title='Stats Table'>
        <div className='flex flex-col gap-4'>
          <Form<FormValues>
            onSubmit={handleSubmit}
            defaultValues={useMemo(() => {
              return {
                fromTime: formatTimestamp(from),
                toTime: formatTimestamp(to)
              }
            }, [from, to])}
          >
            <div className='flex flex-row justify-center gap-4 p-2 text-left'>
              <TextField
                className='col-span-2 m-2'
                label='From:'
                name='fromTime'
                type='dateTime-local'
                placeholder='From'
                rules={{
                  required: {
                    value: true,
                    message: requiredMessage
                  },
                  validate: {
                    value: (value: string) => {
                      const date = new Date(value)

                      if (!(date instanceof Date) || isNaN(date.valueOf())) {
                        return requiredMessage
                      }

                      if (date > to.toDate()) {
                        return 'Invalid date range'
                      }
                    }
                  },
                  valueAsDate: true
                }}
              />
              <TextField
                className='col-span-2 m-2'
                label='To:'
                name='toTime'
                type='dateTime-local'
                placeholder='To'
                rules={{
                  required: {
                    value: true,
                    message: requiredMessage
                  },
                  validate: {
                    value: (value: string) => {
                      const date = new Date(value)
                      return (
                        (date instanceof Date && !isNaN(date.valueOf())) ||
                        requiredMessage
                      )
                    }
                  },
                  valueAsDate: true
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
          </Form>

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
