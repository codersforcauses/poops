import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Form from '@/components/Login/LoginForm'
import Button from '@/components/UI/button'

const EnterPasswordPanel = (props: {
  phoneNumber: string
  togglePanel?: () => void
}) => {
  const [password, setpassword] = useState('')
  const router = useRouter()

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    event.target.reset()
    setpassword('')
  }
  /* TODO: add 'auth update' functionality */

  function handleForgot(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault()
    router.push('/login')
  }
  /* TODO: add 'forgot password' functionality */

  function formFilled() {
    return (password != '' && password.length > 7)
  }

  return (
    <div className='flex w-1/4 flex-auto flex-col items-center'>
      <div className='flex w-fit flex-col'>
        <p className='text-dark-gray text-sm'>Phone Number</p>
        <div className='flex flex-row justify-between'>
          <p>{props.phoneNumber}</p>
          <div className='w-32'></div>
          <button
            className='text-dark-red text-sm italic underline'
            onClick={props.togglePanel}
          >
            change
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center'>
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
        <button
          className='text-dark-red text-sm italic underline'
          onClick={handleForgot}
        >
          Forgot your password?
        </button>
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
