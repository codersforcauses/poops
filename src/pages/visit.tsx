import React from 'react'
import { useState } from 'react'

import Data from '../../mockData/MOCK_DATA.json'

//searchbar function
function Search() {
  const [query, setQuery] = useState('')
  return (
    <div className='flex flex-col content-center'>
      <div className='flex justify-center pb-4 pt-1'>
        <input
          className='text-center'
          placeholder='Search Past Visits...'
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

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
        <div key={post.id} className='flex flex-col space-y-1 rounded border-2'>
          <p className=''>{`${post.first_name} ${post.last_name}`}</p>
          <div className='flex justify-between'>
            <p className='font-bold text-red-500'>{post.pet}</p>
            <p className=''>{post.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const Visit = () => {
  return (
    <div className='container mx-auto'>
      <h1 className='py-2 text-center'>Visit Page</h1>
      <Search />
    </div>
  )
}

export default Visit
