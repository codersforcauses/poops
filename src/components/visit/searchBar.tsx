import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'

import Data from '@/../mockData/MOCK_DATA.json'
import VisitInstance from '@/components/visit/visitInstance'

interface SearchBarState {
  query: string
  startDate: string
  endDate: string
  isEditable: boolean
}

class SearchBar extends React.Component<Record<string, never>, SearchBarState> {
  constructor(props: Record<string, never>) {
    super(props)

    this.state = {
      query: '',
      startDate: '',
      endDate: '',
      isEditable: false
    }
  }

  render() {
    return (
      <div className='flex h-full flex-col content-center'>
        <div className='flex h-[40px] w-[300px] flex-row self-center rounded-xl border p-1 text-poops-dark-gray shadow-xl'>
          <SearchIcon className='floating pointer-events-none m-1 h-6 w-6 text-poops-dark-gray '></SearchIcon>
          <input
            className='m-0 w-full border-0 text-left outline-0'
            placeholder='Search...'
            onChange={(event) => this.setState({ query: event.target.value })}
          />
        </div>
        <div className='flex justify-between p-4'>
          <button>
            <div className='h-[36px] w-[115px] rounded-md bg-poops-dark-red p-0.5 text-center text-xs font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] '>
              <p>REGISTER</p>
              <p>VET CONCERN</p>
            </div>
          </button>
          <button>
            <div className='h-[23.48px] w-[78px] rounded-md bg-poops-dark-red p-0.5 text-center text-xs font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] '>
              <p>REPORT</p>
            </div>
          </button>
          <button>
            <div className='relative h-[37px] w-[37px] rounded-full bg-poops-dark-red p-0.5 text-xl font-semibold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] '>
              <p className='absolute top-1 left-3'>+</p>
            </div>
          </button>
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
            <VisitInstance
              key={post.id}
              id={post.id}
              first_name={post.first_name}
              last_name={post.last_name}
              pet={post.pet}
              date={post.date}
              number={post.number}
              travelled={post.travelled}
              walk_metres={post.walk_metres}
              commute_metres={post.commute_metres}
              method={post.method}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default SearchBar
