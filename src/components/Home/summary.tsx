import React from 'react'

import Statistics from '@/components/Home/statistics'

function Summary() {
  return (
    <div
      className='rounded-lg p-3 py-2 px-5 text-center shadow-lg sm:py-4'
      style={{ background: '#F9F9F9' }}
    >
      <h1 style={{ fontSize: 25, color: '#a52a2a' }}>
        <b>Summary Dashboard</b>
      </h1>
      <hr
        style={{
          background: '#a52a2a',
          color: '#a52a2a',
          borderColor: '#a52a2a',
          height: '2px'
        }}
      />
      <div>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td>
                <Statistics title='Number of Visits' data='12' />
              </td>
              <td>
                <Statistics title='Distance Walked' data='6.5km' />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Summary
