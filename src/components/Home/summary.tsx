import React from 'react'

import Statistics from '@/components/Home/statistics';


function Summary() {

  return (
    <div className="py-2 text-center rounded-lg bg-grey p-3 px-5 sm:py-4 shadow-lg">
      <h1><b>Summary Dashboard</b></h1>
      <div>
        <Statistics title="Number of Visits" data="12" />
        <Statistics title="Distance Walked" data="6.5km" />
      </div>
    </div >
  );
}

export default Summary