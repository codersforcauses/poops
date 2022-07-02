import React from 'react'

interface SummaryStatistics {
  title: string;
  data: string;
}


function Statistics(props: SummaryStatistics) {
  return (
    <div>
    <p>{props.title}</p>
    <p>{props.data}</p>
  </div>
  );
}

export default Statistics