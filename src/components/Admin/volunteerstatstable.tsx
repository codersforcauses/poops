import { useMemo, useState } from 'react'
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

const headers = ['Visit Count', 'Walk (mins)', 'Walk (kms)', 'Commute (kms)']

const VolunteerStatsTable = () => {
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

  const handleSubmit: SubmitHandler<FormValues> = async (
    formData: FormValues
  ) => {
    setFrom(Timestamp.fromDate(new Date(formData.fromTime)))
    setTo(Timestamp.fromDate(new Date(formData.toTime)))
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
            <div className='flex flex-col justify-center gap-4 p-2 text-left'>
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
            <div className='m-auto flex flex-col items-center justify-center'>
              <div className='mb-2 p-2 text-lg'>
                Total Number of Volunteers: {volunteerStats?.volunteerCount}
              </div>
              <table className='border-2 border-primary-dark'>
                <thead>
                  <tr>
                    <th></th>
                    <th className='text-md border-2 border-primary-dark p-2 font-normal md:text-lg lg:text-xl'>
                      Total
                    </th>
                    <th className='text-md border-2 border-primary-dark p-2 font-normal md:text-lg lg:text-xl'>
                      Avg (per volunteer)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {headers.map((header, i) => (
                    <tr key={i}>
                      <th className='text-md border-2 border-primary-dark p-2 font-normal md:text-lg lg:text-xl'>
                        {header}
                      </th>
                      <td className='border-2 border-primary-dark p-2 text-lg text-primary-dark md:text-xl lg:text-2xl'>
                        {totalStats[i]}
                      </td>
                      <td className='border-2 border-primary-dark p-2 text-lg text-primary-dark md:text-xl lg:text-2xl'>
                        {avgStats[i]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default VolunteerStatsTable
