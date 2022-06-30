import React from 'react'
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'

import EditButton from '@/components/visit/Buttons'

interface VisitInstanceProps {
  id: number
  first_name: string
  last_name: string
  pet: string
  date: string
  number: string
  travelled: number
  walk_metres: number
  commute_metres: number
  method: string
}

class VisitInstance extends React.Component<
  VisitInstanceProps,
  { isEditable: boolean }
> {
  constructor(props: VisitInstanceProps) {
    super(props)
    this.state = { isEditable: false }
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
              onClick={() => {
                this.setState({ isEditable: false })
              }}
              className='peer absolute top-0 h-12 w-full cursor-pointer opacity-0'
            />
            <ChevronDownIcon className='absolute top-3 right-5 h-6 w-6 rotate-0 text-poops-dark-red transition-transform duration-500 peer-checked:rotate-180' />

            <div className='font-bold peer-checked:font-normal'>
              <p className='font-bold text-poops-dark-red'>{`# ${this.props.id} - ${this.props.date}`}</p>
              <p className='text-sm'>{`Client Name: ${this.props.first_name} ${this.props.last_name}`}</p>
            </div>

            <div className='max-h-0 justify-between overflow-hidden text-sm transition-all duration-300 peer-checked:max-h-40'>
              {this.state.isEditable ? (
                <>
                  <p>
                    Pet/Pets: <input placeholder={this.props.pet} />
                  </p>
                  <p>
                    Client Phone Number:{' '}
                    <input placeholder={this.props.number} />
                  </p>
                  <p>
                    Distance travelled:{' '}
                    <input placeholder={String(this.props.travelled)} />
                  </p>
                  <p>
                    Walk Metres:{' '}
                    <input placeholder={String(this.props.walk_metres)} />
                  </p>
                  <p>
                    Commute Metres:{' '}
                    <input placeholder={String(this.props.commute_metres)} />
                  </p>
                  <p>
                    Commute Method: <input placeholder={this.props.method} />
                  </p>
                </>
              ) : (
                <>
                  <p>Pet/Pets: {this.props.pet}</p>
                  <p>Client Phone Number: {this.props.number}</p>
                  <p>Distance travelled: {this.props.travelled}</p>
                  <p>Walk Metres: {this.props.walk_metres}</p>
                  <p>Commute Metres: {this.props.commute_metres}</p>
                  <p>Commute Method: {this.props.method}</p>
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
    )
  }
}

export default VisitInstance
