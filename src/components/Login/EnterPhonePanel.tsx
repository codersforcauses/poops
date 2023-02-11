import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input'

import Button from '@/components/UI/button'

import 'react-phone-number-input/style.css'

export interface EnterPhonePanelInterface {
  onClick: (phoneNumber: string) => void
}

const EnterPhonePanel = () => {
  const [value, setValue] = useState<string>()

  /* TODO: add 'auth update' functionality */

  console.log(value)

  return (
    <form className='m-5 flex h-full flex-auto flex-col items-center justify-around'>
      <PhoneInput
        defaultCountry='AU'
        placeholder="Enter phone number"
        value={value}
        onChange={setValue}
      />
      <Button
        className='w-fit'
        type='submit'
        disabled={value === undefined}
      >
        CONTINUE
      </Button>
    </form>
  )
}

export default EnterPhonePanel
