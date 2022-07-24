interface SummaryStatistics {
  title: string
  data: string
}

function Statistics(props: SummaryStatistics) {
  return (
    <div>
      <p className='mt-2 text-lg'>{props.title}</p>
      <p className='text-3xl text-dark-red'>{props.data}</p>
    </div>
  )
}

export default Statistics
