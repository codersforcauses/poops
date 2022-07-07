import React from 'react'
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'
import { updateUserData } from 'databaseIntigration'

import EditButton from '@/components/visit/Buttons'

interface VisitInstanceProps {
  clientNameFirst: string
  clientNameLast: string
  id: string
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
  editClientFirst: string
  editClientLast: string
  editPet: string
  editDate: string
  editDistance: string
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
      editClientFirst: props.firstName,
      editClientLast: props.lastName,
      editDate: props.date,
      editPet: props.petName,
      editDistance: props.distance
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
                  updateUserData(
                    String(this.props.id),
                    this.state.editClientFirst,
                    this.state.editClientLast,
                    this.state.editPet,
                    this.state.editDate,
                    this.state.editDistance
                  )
                  event.preventDefault()
                }}
              >
                <div className='font-bold peer-checked:font-normal'>
                  <input
                    placeholder='Date'
                    value={this.state.editDate}
                    onChange={(event) =>
                      this.setState({ editDate: event.target.value })
                    }
                    className='bg-gray font-normal text-primary'
                  />
                  <input
                    className='bg-gray text-sm font-normal text-primary'
                    placeholder='Last Name'
                    value={this.state.editClientLast}
                    onChange={(event) =>
                      this.setState({ editClientLast: event.target.value })
                    }
                  />
                  <input
                    className='bg-gray text-sm font-normal text-primary'
                    placeholder='First Name'
                    value={this.state.editClientFirst}
                    onChange={(event) =>
                      this.setState({ editClientFirst: event.target.value })
                    }
                  />
                </div>
                <p className='text-sm'>
                  Pet/Pets:{' '}
                  <input
                    className='bg-gray text-primary'
                    placeholder='Pet Name(s)'
                    value={this.state.editPet}
                    onChange={(event) =>
                      this.setState({ editPet: event.target.value })
                    }
                  />
                </p>
                {/* <p>
                    Client Phone Number:{' '}
                    <input placeholder={this.props.number} />
                  </p> */}
                <p className='text-sm'>
                  Distance travelled:{' '}
                  <input
                    className='bg-gray text-primary'
                    placeholder='Distance'
                    value={this.state.editDistance}
                    onChange={(event) =>
                      this.setState({ editDistance: event.target.value })
                    }
                  />
                </p>
                <button
                  type='submit'
                  onClick={() =>
                    setTimeout(function () {
                      window.location.reload() // what
                    }, 500)
                  }
                >
                  Submit
                </button>
              </form>
            ) : (
              <>
                <div className='font-bold peer-checked:font-normal'>
                  <p className='font-bold text-primary'>{`${this.props.date}`}</p>
                  <p className='text-sm'>{`${this.props.lastName}, ${this.props.firstName}`}</p>
                </div>
                <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-40'>
                  <p>Pet/Pets: {this.props.petName}</p>
                  {/* <p>Client Phone Number: {this.props.number}</p> */}
                  <p>Distance travelled: {this.props.distance}</p>
                  {/* <p>Walk Metres: {this.props.walkMetres}</p>
                  <p>Commute Metres: {this.props.commuteMetres}</p>
                  <p>Commute Method: {this.props.method}</p> */}
                </div>
              </>
            )}

            {/* Edit button */}
            <div className='invisible absolute right-5 bottom-1 h-5 w-5 rounded-full bg-primary text-primary transition-all peer-checked:visible'>
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
