import { useState } from 'react'

import EditButton from '@/components/visit/Buttons'
import DatePicker from '@/components/visit/DatePicker'

import Data from '../../../mockData/MOCK_DATA.json'

function VisitsSearchBar() {
  const [query, setQuery] = useState('')
  const [, setStartDate] = useState('')
  const [, setEndDate] = useState('')

  return (
    <div className='flex h-full flex-col content-center'>
      <div className='flex justify-center pb-4 pt-1'>
        <input
          className='form-input m-0 block w-full rounded border text-center'
          placeholder='Search Past Visits...'
          type='search'
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className='container mx-auto mb-2 flex flex-row justify-center'>
        <DatePicker
          value='From'
          onChange={(date: string) => setStartDate(date)}
        />
        <p className='self-center align-middle'>—</p>
        <DatePicker value='To' onChange={(date: string) => setEndDate(date)} />
      </div>

      <div className='h-0 shrink grow overflow-y-auto'>
        {Data.filter((post) => {
          if (
            query === '' ||
            post.first_name.toLowerCase().includes(query.toLowerCase()) ||
            post.last_name.toLowerCase().includes(query.toLowerCase()) ||
            post.pet.toLowerCase().includes(query.toLowerCase())
          ) {
            return post
          }
        }).map((post) => (
          <div
            key={post.id}
            className='m-2 flex flex-col space-y-1 rounded border-2 p-2'
          >
            <div className='relative'>
              <input
                type='checkbox'
                className='peer absolute top-0 h-10 w-full cursor-pointer opacity-0'
              ></input>
              <p className=''>{`${post.first_name} ${post.last_name}`}</p>
              <div className='flex justify-between'>
                <p className='font-bold text-red-500'>{post.pet}</p>
                <p className=''>{post.date}</p>
              </div>
              <div className='max-h-0 overflow-hidden bg-red-100 transition-all duration-500 peer-checked:max-h-40'>
                <p>Client Phone Number: {post.number}</p>
                <p>Distance travelled: {post.travelled}</p>
                <div className='flex justify-between'>
                  <p>Walk Metres: {post.walk_metres}</p>
                  <EditButton />
                </div>
                <p>Commute Metres: {post.commute_metres}</p>
                <p>Commute Method: {post.method}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VisitsSearchBar
