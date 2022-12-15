import Statistics from '@/components/Home/statistics'

const dummyVisitData = '12'
const dummyDistanceData = '6.5'

function Summary() {
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
                <Statistics title='Number of Visits' data={dummyVisitData} />
              </td>
              <td>
                <Statistics
                  title='Distance Walked'
                  data={dummyDistanceData + ' km'}
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
