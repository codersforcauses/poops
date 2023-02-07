const headers = [
  'Number of Clients',
  'Number of Visits',
  'Walk Duration (mins)',
  'Walk Distance (kms)',
  'Commute Distance (kms)'
]

const data = {
  voluteerCount: 10,
  totalClientCount: 50,
  totalCommuteDistance: 50,
  totalVisitCount: 500,
  totalWalkDistance: 500,
  totalWalkTime: 5000,
  avgClientCount: 50,
  avgCommuteDistance: 50,
  avgVisitCount: 500,
  avgWalkDistance: 500,
  avgWalkTime: 5000
}

function VoluteerStatsTable() {
  const {
    voluteerCount,
    totalClientCount,
    totalCommuteDistance,
    totalVisitCount,
    totalWalkDistance,
    totalWalkTime,
    avgClientCount,
    avgCommuteDistance,
    avgVisitCount,
    avgWalkDistance,
    avgWalkTime
  } = data

  const totalStats = [
    totalClientCount,
    totalVisitCount,
    totalWalkTime,
    totalWalkDistance,
    totalCommuteDistance
  ]

  const avgStats = [
    avgClientCount,
    avgVisitCount,
    avgWalkTime,
    avgWalkDistance,
    avgCommuteDistance
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
        <div className='text-primary-dark'>{voluteerCount}</div>
      </div>
    </div>
  )
}

export default VoluteerStatsTable
