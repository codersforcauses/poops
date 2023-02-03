import Tooltip from '@/components/UI/tooltip'

interface SummaryStatistics {
  title: string
  data: string
  tooltip?: string
}

function Statistics(props: SummaryStatistics) {
  return (
    <div>
      <p className='mt-2 text-lg'>{props.title}</p>
      <Tooltip tooltip={props.tooltip}>
        <p className='text-3xl text-primary-dark'>{props.data}</p>
      </Tooltip>
    </div>
  )
}

export default Statistics
