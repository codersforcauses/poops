import React from 'react'

import Statistics from '@/components/Home/statistics';

function Summary() {
  return (
      <div className="py-2 text-center rounded-lg bg-white p-3 px-5 hover:bg-grey focus:bg-grey sm:py-4">
        <h1>Summary Dashboard</h1>
        <div className="flex items-center space-x">
          <Statistics title="Number of Visits" data="12" />
          <Statistics title="Distance Walked" data="6.5km" />
        </div>
      </div>
  );
}

export default Summary