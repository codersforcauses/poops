import React from 'react'
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'

import EditButton from '@/components/visit/Buttons'

interface VisitInstanceProps {
  id: number
  firstName: string
  lastName: string
  petName: string
  date: string
  distance: string
  // number: string
  // travelled: number
  // walkMetres: number
  // commuteMetres: number
  // method: string
}

interface VisitInstanceState {
  isEditable: boolean
  isOpen: boolean
  isLoaded: boolean
}

class VisitInstance extends React.Component<
  VisitInstanceProps,
  VisitInstanceState
> {
  constructor(props: VisitInstanceProps) {
    super(props)
    this.state = {
      isEditable: false,
      isOpen: false,
      isLoaded: false
    }
  }

  render() {
    return (
      <div
        key={this.props.id}
        className='m-2 flex flex-col space-y-1 rounded-xl bg-poops-gray p-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
      >
        <div className='flex justify-between'>
          <div className='relative w-full'>
            <input
              type='checkbox'
              checked={this.state.isOpen}
              onChange={() => {
                this.setState({
                  isEditable: false,
                  isOpen: !this.state.isOpen
                })
              }}
              className='peer absolute top-0 h-12 w-full cursor-pointer opacity-0'
            />

            <ChevronDownIcon
              className='absolute top-3 right-5 h-6 w-6 cursor-pointer text-dark-red transition-transform duration-500 peer-checked:rotate-180'
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}
            />

            <div className='font-bold peer-checked:font-normal'>
              <p className='font-bold text-dark-red'>{`# ${this.props.id} - ${this.props.date}`}</p>
              <p className='text-sm'>{`Client Name: ${this.props.firstName} ${this.props.lastName}`}</p>
            </div>

            <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-40'>
              {this.state.isEditable ? (
                <>
                  <p>
                    Pet/Pets: <input placeholder={this.props.petName} />
                  </p>
                  {/* <p>
                    Client Phone Number:{' '}
                    <input placeholder={this.props.number} />
                  </p> */}
                  <p>
                    Distance travelled:{' '}
                    <input placeholder={this.props.distance} />
                  </p>
                  {/* <p>
                    Walk Metres:{' '}
                    <input placeholder={String(this.props.walkMetres)} />
                  </p>
                  <p>
                    Commute Metres:{' '}
                    <input placeholder={String(this.props.commuteMetres)} />
                  </p>
                  <p>
                    Commute Method: <input placeholder={this.props.method} />
                  </p> */}
                </>
              ) : (
                <>
                  <p>Pet/Pets: {this.props.petName}</p>
                  {/* <p>Client Phone Number: {this.props.number}</p> */}
                  <p>Distance travelled: {this.props.distance}</p>
                  {/* <button
                    type='button'
                    onClick={() => {
                      if (!this.state.isLoaded) {
                        this.setState({ isLoaded: true })
                      }
                    }}
                  ></button> */}
                  {/* <p>Walk Metres: {this.props.walkMetres}</p>
                  <p>Commute Metres: {this.props.commuteMetres}</p>
                  <p>Commute Method: {this.props.method}</p> */}
                </>
              )}
            </div>

            {/* Edit button */}
            <div className='invisible absolute right-5 bottom-1 h-5 w-5 rounded-full bg-dark-red text-dark-red transition-all peer-checked:visible'>
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
    )
  }
}

export default VisitInstance
