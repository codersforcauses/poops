import Statistics from '@/components/Admin/Stats/statistics'

const dummyVisitData = '12'
const dummyTimeData = '400'
const dummyDistanceData = '6.5'

const borderColor = ' border-gray-300 '
const headerCellDecor = borderColor + 'border-4 p-6 font-extrabold text-2xl'

function Summary() {
  return (
    <div className='rounded-lg py-4 px-5 text-center sm:py-4'>
      <h1 className='mb-2 text-xl text-dark-red'>
        <b>Admin Summary Dashboard</b>
      </h1>
      <hr className='h-0.5 border-dark-red bg-dark-red text-dark-red' />
      <div>
        <table className={'w-full border-collapse border-spacing-2 border-8' + borderColor}>
          <thead>
            <tr>
              <th className=''></th>
              <th className={headerCellDecor}>Number of Clients</th>
              <th className={headerCellDecor}>Number of Visits</th>
              <th className={headerCellDecor}>Time Walked (mins)</th>
              <th className={headerCellDecor}>Distance Walked Over the Period (kms)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={headerCellDecor}>Total</th>
                <Statistics
                  title=''
                  data={dummyVisitData}
                />
                <Statistics title='' data={dummyVisitData} />
                <Statistics
                  title=''
                  data={dummyTimeData + ' mins'}
                />
                <Statistics
                  title=''
                  data={dummyDistanceData + ' km'}
                />
            </tr>

            <tr>
              <th className={headerCellDecor}>Average (per volunteer)</th>
              <Statistics title='' data={dummyVisitData} />
              <Statistics title='' data={dummyVisitData} />
              <Statistics
                title=''
                data={dummyTimeData + ' mins'}
              />
              <Statistics
                title=''
                data={dummyDistanceData + ' km'}
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Summary