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
    { value: '+61', label: 'Australia (+61)' },
    { value: '+06', label: 'Malaysia (+06)'}
  ]

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    onClick(countrycode + displaynumber)
    event.preventDefault()
    event.target.reset()
  }

  function formFilled() {
    return displaynumber !== ''
  }

  return (
    <div className='m-auto grid h-1/3 justify-center space-y-4 p-5'>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center'>
          {/* <label htmlFor='countrycode' className='font-bold'>
                Country Code
              </label>
              <div
                className='mt-1 mb-2 mr-10 flex h-9 rounded border border-[#6b7280] py-0.5 px-4 text-center
                className='px-auto form-select mt-1 mb-2 flex h-9 rounded border border-[#6b7280] py-0.5 text-center focus:outline-none'
        shadow-lg focus:outline-[#0066ff]'
              >
                {countryCode}
              </div> */}
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
        <table align='center'>
          <Button
            className='mt-8 mb-2'
            size='large'
            type='submit'
            disabled={!formFilled()}
          >
            CONTINUE
          </Button>
        </table>
      </form>
    </div>
  )
}

export default EnterPhonePanel
