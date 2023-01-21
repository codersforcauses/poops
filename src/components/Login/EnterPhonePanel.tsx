import { useState } from 'react'

import Form from '@/components/Login/LoginForm'
import Button from '@/components/UI/button'
import { SelectOption } from '@/types/types'

export interface EnterPhonePanelInterface {
  onClick: (phoneNumber: string) => void
}

const EnterPhonePanel = ({ onClick }: EnterPhonePanelInterface) => {
  const [displaynumber, setdisplaynumber] = useState('')
  const [countrycode, setcountrycode] = useState('')

  const countryCodeSelectOptions: SelectOption[] = [
    { value: '+61', label: 'Australia (+61)' }
  ]

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    onClick(countrycode + displaynumber)
    event.preventDefault()
    event.target.reset()
  }
  /* TODO: add 'auth update' functionality */

  function formFilled() {
    return displaynumber !== ''
  }

  return (
    <div className='flex w-1/4 flex-auto flex-col'>
      <form
        onSubmit={handleSubmit}
        className='m-5 flex h-full flex-auto flex-col items-center justify-around'
      >
        <div className='flex justify-center'>
          <Form
            id='countrycode'
            label='Country Code'
            type='select'
            isNumPad={false}
            placeholder={countrycode}
            isRequired={true}
            onChange={(event) => setcountrycode(event.target.value)}
            selectOptions={countryCodeSelectOptions}
          />
          <Form
            id='phonenumber'
            label='Phone Number'
            type='text'
            isNumPad={true}
            placeholder='  '
            isRequired={true}
            onChange={(event) => setdisplaynumber(event.target.value)}
          />
        </div>
        <Button
          className='w-fit'
          size='large'
          type='submit'
          disabled={!formFilled()}
        >
          CONTINUE
        </Button>
      </form>
    </div>
  )
}

export default EnterPhonePanel
