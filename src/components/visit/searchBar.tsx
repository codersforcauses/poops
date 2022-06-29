import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'

import Data from '@/../mockData/MOCK_DATA.json'
import EditButton from '@/components/visit/buttons'

interface SearchBarState {
  query: string
  startDate: string
  endDate: string
}

class SearchBar extends React.Component<Record<string, never>, SearchBarState> {
  constructor(props: Record<string, never>) {
    super(props)

    this.state = {
      query: '',
      startDate: '',
      endDate: ''
    }
  }

  render() {
    return (
      <div className='flex h-full flex-col content-center'>
        <div className='flex flex-row rounded-full border p-1'>
          <SearchIcon className='flex h-8 w-8 self-center'></SearchIcon>
          <input
            className='form-input m-0 w-full rounded-full border-0 text-left'
            placeholder='Search'
            type='search'
            onChange={(event) => this.setState({ query: event.target.value })}
          />
        </div>

        {/* <div className='container mx-auto mb-2 flex flex-row justify-center'>
          <DatePicker
            value='From'
            onChange={(date: string) => this.setState({ startDate: date })}
          />
          <p className='self-center align-middle'>—</p>
          <DatePicker
            value='To'
            onChange={(date: string) => this.setState({ endDate: date })}
          />
        </div> */}

        {/* would be nice if this was in its own component */}
        <div className='h-0 shrink grow overflow-y-auto'>
          {Data.filter((post) => {
            if (
              this.state.query === '' ||
              post.first_name
                .toLowerCase()
                .includes(this.state.query.toLowerCase()) ||
              post.last_name
                .toLowerCase()
                .includes(this.state.query.toLowerCase()) ||
              post.pet.toLowerCase().includes(this.state.query.toLowerCase())
            ) {
              return post
            }
          }).map((post) => (
            <div
              key={post.id}
              className='m-2 flex flex-col space-y-1 rounded-xl bg-poops-gray p-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
            >
              <div className='flex justify-between'>
                <div className='relative w-full'>
                  <input
                    type='checkbox'
                    className='peer absolute top-0 h-12 w-full cursor-pointer opacity-0'
                  ></input>
                  <div className='font-bold peer-checked:font-normal'>
                    <p className='font-bold text-poops-dark-red'>{`# ${post.id} - ${post.date}`}</p>
                    <p className='text-sm'>{`Client Name: ${post.first_name} ${post.last_name}`}</p>
                  </div>
                  <div className='absolute top-3 right-5 rotate-0 text-poops-dark-red transition-transform duration-500 peer-checked:rotate-180'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </div>
                  <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-40'>
                    <p>Client Phone Number: {post.number}</p>
                    <p>Distance travelled: {post.travelled}</p>
                    <p>Walk Metres: {post.walk_metres}</p>
                    <p>Commute Metres: {post.commute_metres}</p>
                    <p>Commute Method: {post.method}</p>
                  </div>
                  <div className='invisible absolute right-5 bottom-1 h-5 w-5 rounded-full bg-poops-dark-red text-poops-dark-red transition-all peer-checked:visible'>
                    <EditButton />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default SearchBar
