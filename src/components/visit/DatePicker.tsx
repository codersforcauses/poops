import React from 'react'

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
}

class DatePicker extends React.Component<DatePickerProps> {
  constructor(props: DatePickerProps) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }
  render(): React.ReactNode {
    return (
      <div className='flex items-center justify-center p-2'>
        <div className='form-floating relative'>
          <input
            type='date'
            className='form-control m-0 block w-full rounded border'
            onChange={this.handleChange}
          />
          <label htmlFor='floatingInput' className='poops-dark-gray'>
            {this.props.value}
          </label>
        </div>
      </div>
    )
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange(event.target.value)
  }
}

export default DatePicker
