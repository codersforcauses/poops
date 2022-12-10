import React, { useState } from 'react'
import Link from 'next/link'

import Form from '@/components/Login/LoginForm'
import Button from '@/components/UI/button'

const EnterPasswordPanel = (props: {
  phoneNumber: string, 
  togglePanel?: () => void
}) => {
  const [password, setpassword] = useState('')

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    event.target.reset()
    setpassword('')
  }

  function formFilled() {
    return password != ''
  }

  return (
    <div className='flex flex-col m-auto h-1/3 w-1/4 justify-center align-center space-y-4 p-5'>
      <p className='text-sm text-dark-gray'>
        Phone Number
      </p>
      <div className='flex flex-row justify-between'>
        <p>
          {props.phoneNumber}
        </p>

        <button className='text-sm italic underline text-dark-red' onClick={props.togglePanel} >
          change
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='justify-center flex'>
          <Form
            id='password'
            label='Password'
            type='password'
            isNumPad={false}
            placeholder=''
            isRequired={true}
            onChange={(event) => setpassword(event.target.value)}
          />
        </div>
        <Link
          className='text-xs italic underline text-[#828282] cursor-pointer hover:text-dark-red'
          href='/index'
        >
          Forgot your password?
        </Link>
        <div className='flex justify-center self-end'>
          <Button
            className='mt-8 mb-2'
            size='large'
            type='submit'
            disabled={!formFilled()}
          >
            SIGN-IN
          </Button>
        </div>
      </form>
    </div>
  )
}
export default EnterPasswordPanel
