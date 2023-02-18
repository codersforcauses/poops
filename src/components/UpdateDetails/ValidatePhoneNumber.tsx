import React, { useState } from 'react'
import { E164Number } from 'libphonenumber-js/types'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

interface PhoneNumberInputProps {
  onSubmit: (phoneNumber: string) => void
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const editPhoneNumber = (number: E164Number | undefined) => {
    if (number) {
      setPhoneNumber(number?.toString())
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (isValidPhoneNumber(phoneNumber)) {
      onSubmit(phoneNumber)
      setPhoneNumber('')
    } else {
      alert('Please enter a valid phone number.')
    }
  }

  return (
    <div>
      <label htmlFor='phoneNumber'>Phone number:</label>
      <PhoneInput
        id='phoneNumber'
        value={phoneNumber}
        onChange={(e) => editPhoneNumber(e)}
      />
      <button type='submit' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}

export default PhoneNumberInput
