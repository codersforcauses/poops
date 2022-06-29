import React from 'react'
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/outline'

import Data from '@/../mockData/MOCK_DATA.json'
import EditButton from '@/components/visit/Buttons'

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
        <div className='flex w-60 flex-row self-center rounded-xl border p-1 text-poops-dark-gray'>
          <SearchIcon className='floating pointer-events-none m-1 h-6 w-6 text-poops-dark-gray'></SearchIcon>
          <input
            className='m-0 w-full border-0 text-left outline-0'
            placeholder='Search'
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
                    onClick={() => {
                      this.setState({ isEditable: false })
                    }}
                    className='peer absolute top-0 h-12 w-full cursor-pointer opacity-0'
                  />
                  <ChevronDownIcon className='absolute top-3 right-5 h-6 w-6 rotate-0 text-poops-dark-red transition-transform duration-500 peer-checked:rotate-180' />

                  <div className='font-bold peer-checked:font-normal'>
                    <p className='font-bold text-poops-dark-red'>{`# ${post.id} - ${post.date}`}</p>
                    <p className='text-sm'>{`Client Name: ${post.first_name} ${post.last_name}`}</p>
                  </div>

                  <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-40'>
                    {this.state.isEditable ? (
                      <>
                        <p>
                          Pet/Pets: <input placeholder={post.pet} />
                        </p>
                        <p>
                          Client Phone Number:{' '}
                          <input placeholder={post.number} />
                        </p>
                        <p>
                          Distance travelled:{' '}
                          <input placeholder={String(post.travelled)} />
                        </p>
                        <p>
                          Walk Metres:{' '}
                          <input placeholder={String(post.walk_metres)} />
                        </p>
                        <p>
                          Commute Metres:{' '}
                          <input placeholder={String(post.commute_metres)} />
                        </p>
                        <p>
                          Commute Method: <input placeholder={post.method} />
                        </p>
                      </>
                    ) : (
                      <>
                        <p>Pet/Pets: {post.pet}</p>
                        <p>Client Phone Number: {post.number}</p>
                        <p>Distance travelled: {post.travelled}</p>
                        <p>Walk Metres: {post.walk_metres}</p>
                        <p>Commute Metres: {post.commute_metres}</p>
                        <p>Commute Method: {post.method}</p>
                      </>
                    )}
                  </div>
                  <div className='invisible absolute right-5 bottom-1 h-5 w-5 rounded-full bg-poops-dark-red text-poops-dark-red transition-all peer-checked:visible'>
                    <button
                      type='button'
                      onClick={() => {
                        this.setState({ isEditable: true })
                      }}
                      className=''
                    >
                      <EditButton />
                    </button>
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
