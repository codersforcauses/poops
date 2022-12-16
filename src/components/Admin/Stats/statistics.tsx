interface SummaryStatistics {
  title?: string
  data: string
}

const borderColor = ' border-gray-300 '
const cellDecor = borderColor + 'border-4 p-10'

function Statistics(props: SummaryStatistics) {
  return (
      <td className={cellDecor}>
        <p className='mt-2 text-lg'>{props.title}</p>
        <p className='text-3xl text-dark-red font-extrabold'>{props.data}</p>
      </td>
  )
}

export default Statistics
