import { useState } from 'react'
import { NextPage } from 'next'

import Form from '@/components/Home/form'
import LoginHeader from '@/components/Login/LoginHeader'
import { withPublic } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'

const Login: NextPage = () => {
  const [phonenumber, setphonenumber] = useState(0)

  const pageTitle = 'Phone Login'
  const primaryMessage = 'Enter your phone number'
  const secondaryMessage = 'Please enter your phone number'

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    event.target.reset()
    setphonenumber(0)
  }

  function formFilled() {
    return phonenumber != 0
  }

  return (
    <main>
      <LoginHeader
        pageTitle={pageTitle}
        primaryMessage={primaryMessage}
        secondaryMessage={secondaryMessage}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <table className='w-1/3' align='center'>
              <td>
                <div className='flex flex-col p-1'>
                  <label htmlFor='countrycode' className='font-bold'>
                    Country Code
                  </label>
                  <div
                    className='mt-1 mb-2 mr-10 flex h-9 rounded border border-[#6b7280] py-0.5 px-4 text-center
            shadow-lg focus:outline-[#0066ff]'
                  >
                    +61
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <Form
                    id='phonenumber'
                    label='Phone Number'
                    type='text'
                    isNumPad={true}
                    placeholder='  '
                    isRequired={true}
                    onChange={(event) =>
                      setphonenumber(Number(event.target.value))
                    }
                  />
                </div>
              </td>
            </table>
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
      </LoginHeader>
    </main>
  )
}

export default withPublic(Login)
