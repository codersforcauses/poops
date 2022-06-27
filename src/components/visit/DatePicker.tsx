import React from 'react'
require('tw-elements')

class DatePicker extends React.Component {
  constructor(props: Record<string, unknown>) {
    super(props)
    this.state = { date: new Date() }
    this.handleDate = this.handleDate.bind(this)
  }
  render(): React.ReactNode {
    return (
      <div className='flex items-center justify-center'>
        <div
          className='datepicker form-floating relative mb-3 xl:w-96'
          data-mdb-toggle-button='false'
        >
          <input
            type='text'
            className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
            placeholder='Select a date'
            data-mdb-toggle='datepicker'
            onChange={this.handleDate}
          />
          <label htmlFor='floatingInput' className='text-gray-700'>
            Select a date
          </label>
        </div>
      </div>
    )
  }

  handleDate(event: Event) {
    this.props.onDateChange(event.target.value)
  }
}

export default DatePicker
