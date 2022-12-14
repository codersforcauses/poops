import Statistics from '@/components/Admin/Stats/statistics'

const dummyVisitData = '12'
const dummyTimeData = '400'
const dummyDistanceData = '6.5'

function Summary() {
  return (
    <div className='rounded-lg bg-zinc-200 py-4 px-5 text-center shadow-lg sm:py-4'>
      <h1 className='mb-2 text-xl text-dark-red'>
        <b>Admin Summary Dashboard</b>
      </h1>
      <hr className='h-0.5 border-dark-red bg-dark-red text-dark-red' />
      <div>
        <table className='w-full'>
          <tbody>
            <tr>
              <td>
                <Statistics title='Total Number of Volunteer Visits' data={dummyVisitData} />
              </td>
              <td>
                <Statistics
                  title='Total Time Walked in Minutes'
                  data={dummyTimeData + ' mins'}
                />
              </td>
              <td>
                <Statistics
                  title='Total Distance Walked over the period'
                  data={dummyDistanceData + ' km'}
                />
              </td>
            </tr>

            <tr>
              <td>
                <Statistics title='Average Number of Visits per Volunteer' data={dummyVisitData} />
              </td>
              <td>
                <Statistics
                  title='Average Time Walked in Minutes'
                  data={dummyTimeData + ' mins'}
                />
              </td>
              <td>
                <Statistics
                  title='Average Distance Walked over the period'
                  data={dummyDistanceData + ' km'}
                />
              </td>
            </tr>

            <tr>
              <td>
                <Statistics title='Average Number of Clients' data={dummyVisitData} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Summary