import { useState } from 'react'

import Data from '../../mockData/MOCK_DATA.json'

function VisitsSearchBar() {
  const [query, setQuery] = useState('')
  return (
    <div className='flex h-full flex-col content-center'>
      <div className='flex justify-center pb-4 pt-1'>
        <input
          className='form-input text-center'
          placeholder='Search Past Visits...'
          type='search'
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className='h-0 shrink grow overflow-y-auto'>
        {Data.filter((post) => {
          if (query == '') {
            return post
          } else if (
            post.first_name.toLowerCase().includes(query.toLowerCase())
          ) {
            return post
          } else if (post.pet.toLowerCase().includes(query.toLowerCase()))
            return post
        }).map((post) => (
          <div
            key={post.id}
            className='m-2 flex flex-col space-y-1 rounded border-2 p-2'
          >
            <details>
              <summary className='list-none'>
                <p className=''>{`${post.first_name} ${post.last_name}`}</p>
                <div className='flex justify-between'>
                  <p className='font-bold text-red-500'>{post.pet}</p>
                  <p className=''>{post.date}</p>
                </div>
              </summary>
              <div>
                <p>Client Phone Number</p>
                <p>Distance travelled.</p>
                <p>Walk Metres.</p>
                <p>Distance travelled.</p>
                <p>Commute Metres</p>
                <p>Commute Method</p>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VisitsSearchBar
