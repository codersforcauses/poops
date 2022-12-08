import React, { useState } from 'react'

import Form from '@/components/Login/LoginForm'
import Button from '@/components/UI/button'

const EnterPasswordPanel = () => {
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
    <div className='m-auto grid h-1/3 justify-center space-y-4 p-5'>
      <form onSubmit={handleSubmit}>
        <div className='justify-left flex'>
          <Form
            id='password'
            label='Password'
            type='text'
            isNumPad={false}
            placeholder=''
            isRequired={true}
            onChange={(event) => setpassword(event.target.value)}
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
export default EnterPasswordPanel
