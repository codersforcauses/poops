import React from 'react'
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'
import { updateUserData, User, Visit } from 'databaseIntigration'

import EditButton from '@/components/visit/Buttons'

type VisitInstanceProps = Visit

interface VisitInstanceState extends User {
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
      isLoaded: false,
      firstName: props.firstName,
      lastName: props.lastName,
      dateTime: props.dateTime,
      petName: props.petName,
      walkDist: props.walkDist,
      duration: props.duration,
      commuteDist: props.commuteDist,
      commuteMethod: props.commuteMethod,
      notes: props.notes
    }
  }

  render() {
    return (
      <div
        key={this.props.id}
        className='m-2 flex flex-col space-y-1 rounded-xl bg-gray p-2 drop-shadow-default'
      >
        <div className='flex justify-between'>
          <div className='relative w-full'>
            <input
              type='checkbox'
              checked={this.state.isOpen}
              readOnly={true}
              className='peer absolute h-0 w-0 cursor-pointer opacity-0'
            />

            <ChevronDownIcon
              className='absolute top-3 right-5 h-6 w-6 cursor-pointer text-primary transition-transform duration-500 peer-checked:rotate-180'
              onClick={() =>
                this.setState({ isOpen: !this.state.isOpen, isEditable: false })
              }
            />
            {this.state.isEditable ? (
              <form
                onSubmit={(event) => {
                  const userData: User = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    petName: this.state.petName,
                    dateTime: this.state.dateTime,
                    duration: this.state.duration,
                    walkDist: this.state.walkDist,
                    commuteDist: this.state.commuteDist,
                    commuteMethod: this.state.commuteMethod,
                    notes: this.state.notes
                  }
                  updateUserData(this.props.id, userData)
                  event.preventDefault()
                }}
              >
                <div className='font-bold peer-checked:font-normal'>
                  <input
                    placeholder='Date'
                    value={this.state.dateTime}
                    onChange={(event) =>
                      this.setState({ dateTime: event.target.value })
                    }
                    className='bg-gray font-normal text-primary'
                  />
                  <div>
                    <input
                      size={8}
                      className='bg-gray text-sm font-normal text-primary'
                      placeholder='Last Name'
                      value={this.state.lastName}
                      onChange={(event) =>
                        this.setState({ lastName: event.target.value })
                      }
                    />
                    <input
                      size={8}
                      className='bg-gray text-sm font-normal text-primary'
                      placeholder='First Name'
                      value={this.state.firstName}
                      onChange={(event) =>
                        this.setState({ firstName: event.target.value })
                      }
                    />
                  </div>
                </div>
                <p className='text-sm'>
                  Pet/Pets:{' '}
                  <input
                    size={8}
                    className='bg-gray text-primary'
                    placeholder='Pet Name(s)'
                    value={this.state.petName}
                    onChange={(event) =>
                      this.setState({ petName: event.target.value })
                    }
                  />
                </p>
                <p className='text-sm'>
                  Duration:{' '}
                  <input
                    size={8}
                    className='bg-gray text-primary'
                    placeholder='Duration'
                    value={this.state.duration}
                    onChange={(event) =>
                      this.setState({ duration: event.target.value })
                    }
                  />
                </p>
                <p className='text-sm'>
                  Walk Metres:{' '}
                  <input
                    size={8}
                    className='bg-gray p-0 text-sm text-primary'
                    type='number'
                    step='0.001'
                    placeholder='Distance'
                    value={this.state.walkDist.toString()}
                    onChange={(event) => {
                      if (!isNaN(parseFloat(event.target.value))) {
                        this.setState({
                          walkDist: parseFloat(event.target.value)
                        })
                      } else {
                        this.setState({ walkDist: 0 })
                      }
                    }}
                  />
                </p>
                <p className='text-sm'>
                  Commute Metres:{' '}
                  <input
                    size={8}
                    className='bg-gray text-primary'
                    type='number'
                    step='0.001'
                    placeholder='Distance'
                    value={this.state.commuteDist.toString()}
                    onChange={(event) => {
                      if (!isNaN(parseFloat(event.target.value))) {
                        this.setState({
                          commuteDist: parseFloat(event.target.value)
                        })
                      } else {
                        this.setState({ commuteDist: 0 })
                      }
                    }}
                  />
                </p>
                <p className='text-sm'>
                  Commute Method:{' '}
                  <input
                    size={8}
                    className='bg-gray text-primary'
                    placeholder='Method'
                    value={this.state.commuteMethod}
                    onChange={(event) =>
                      this.setState({ commuteMethod: event.target.value })
                    }
                  />
                </p>
                <p className='text-sm'>
                  Notes:{' '}
                  <input // maybe use textarea tag instead?
                    size={8}
                    className='bg-gray text-primary'
                    placeholder='Notes'
                    value={this.state.notes}
                    onChange={(event) =>
                      this.setState({ notes: event.target.value })
                    }
                  />
                </p>
                <button
                  type='submit'
                  className='text-bold mt-2 rounded-xl bg-primary p-2 text-white drop-shadow-default'
                  onClick={() =>
                    setTimeout(() => {
                      window.location.reload()
                    }, 500)
                  }
                >
                  Submit
                </button>
              </form>
            ) : (
              <>
                <div className='font-bold peer-checked:font-normal'>
                  <p className='font-bold text-primary'>{`${this.props.dateTime}`}</p>
                  <p className='text-sm'>{`${this.props.lastName}, ${this.props.firstName}`}</p>
                </div>
                <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-40'>
                  <p>Pet/Pets: {this.props.petName}</p>
                  <p>Duration: {this.props.duration}</p>
                  <p>Walk Metres: {this.props.walkDist.toFixed(3)} km</p>
                  <p>Commute Metres: {this.props.commuteDist.toFixed(1)} km</p>
                  <p>Commute Method: {this.props.commuteMethod}</p>
                  <p>Notes: {this.props.notes}</p>
                </div>
              </>
            )}

            {/* Edit button */}
            <div className='invisible absolute right-4 bottom-1 h-7 w-7 rounded-full bg-primary text-primary drop-shadow-default transition-all peer-checked:visible'>
              <button
                type='button'
                onClick={() => {
                  this.setState({ isEditable: !this.state.isEditable })
                }}
              >
                <EditButton isEdit={this.state.isEditable} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VisitInstance
