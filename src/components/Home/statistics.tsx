import React from 'react'

interface SummaryStatistics {
  title: string
  data: string
}

function Statistics(props: SummaryStatistics) {
  return (
    <div>
      <p style={{ fontSize: 20 }}>{props.title}</p>
      <p style={{ fontSize: 40, color: '#a52a2a' }}>{props.data}</p>
    </div>
  )
}

export default Statistics
