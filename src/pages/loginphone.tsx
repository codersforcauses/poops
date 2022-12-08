import { useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'

import Form from '@/components/Home/form'
import { withPublic } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'

const Login: NextPage = () => {
  const [phonenumber, setphonenumber] = useState(0)
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
      <title>Phone Login</title>
      <div className='animate-text bg-gradient-to-b from-zinc-300 via-zinc-200 to-zinc-50 '>
        <div className='m-auto max-w-sm p-10'>
          <Image
            src='/images/poops-logo-transparent.png'
            width={36}
            height={36}
            layout='responsive'
            alt='POOPS logo'
            className='rounded-full'
          ></Image>
        </div>
      </div>

      <div className='p-3 text-center text-xl font-bold'>
        Enter your phone number
      </div>
      <div className='text-x1 mb-10 text-center font-sans'>
        Please enter your phone number
      </div>

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
    </main>
  )
}

export default withPublic(Login)
