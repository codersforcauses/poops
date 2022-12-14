import Statistics from '@/components/Home/statistics'

const dummyVisitData = '12'
const dummyDistanceData = '6.5'
const dummyHourData = '3'
const dummyDistanceCommuted = '20.5'

function Summary() {
  return (
    <div className='rounded-lg bg-zinc-200 py-4 px-5 text-center shadow-lg sm:py-4'>
      <h1 className='mb-2 text-xl text-dark-red'>
        <b>Summary Dashboard</b>
      </h1>
      <hr className='h-0.5 border-dark-red bg-dark-red text-dark-red' />
      <div>
        <table className='w-full'>
          <tbody>
            <tr>
              <td>
                <Statistics title='Number of Visits' data={dummyVisitData} />
              </td>
              <td>
                <Statistics
                  title='Distance Walked'
                  data={dummyDistanceData + ' km'}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Statistics title='Number of Hours' data={dummyHourData} />
              </td>
              <td>
                <Statistics
                  title='Distance Commuted'
                  data={dummyDistanceCommuted + ' km'}
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
