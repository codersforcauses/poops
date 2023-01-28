import { FormEvent, useState } from 'react'
import router, { useRouter } from 'next/router'
import { ResolverSuccess } from 'react-hook-form'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import Button from '@/components/UI/button'
import FormField from '@/components/Visit/formfield'

import ROLES_DATA from '../../../mockData/ROLES_DATA.json'

//current: table consists of mockdata, email submit consolelogs the email
//todo: update firebase schema and use that data, email submit updates firebase and pulls new data

const Roles = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (click: FormEvent<HTMLFormElement>) => {
    click.preventDefault()

    //function should work, to be used once the firestore data can be
    // const addPriviliegeAcess = {
    //   email: email,
    //   roles: { admin: true }
    // }

    // fetch('/api/setRole', {
    //   method: 'POST',
    //   body: JSON.stringify(addPriviliegeAcess)
    // })

    console.log('gave admin to: ' + email)
  }

  return (
    <>
      <Header pageTitle='Roles' />
      <div className='main-style'>
        <div className='m-auto flex h-14 w-full flex-row'>
          <div className='m-auto flex-1 text-center'>
            <Button
              type='button'
              size='medium'
              onClick={() => router.push('/admin')}
            >
              Back
            </Button>
          </div>
          <h1 className='m-3 flex-1 text-center text-2xl'>Roles</h1>

          <div className='flex-1'></div>
        </div>
        <form onSubmit={handleSubmit} className='m-auto mb-3 w-1/2 rounded-lg'>
          <FormField
            id='emailInput'
            type='email'
            placeholder='email required'
            label='Give admin to:'
            isRequired={true}
            onChange={(event) => setEmail(event.target.value)}
          />
        </form>

        <div className='flex max-h-screen'>
          <table className='m-auto flex border-spacing-3 flex-row'>
            <tbody>
              {ROLES_DATA.map((roles, i) => (
                <div key={i} className='border-slate-700 flex flex-row border'>
                  <tr className='flex flex-col text-left'>
                    <th>Id:</th>
                    <th>Role:</th>
                    <th>Assigned By:</th>
                    <th>Created At:</th>
                  </tr>
                  <tr className='mr-1 flex flex-1 flex-col text-right'>
                    <td>{roles['id']}</td>
                    <td>{roles['roles']}</td>
                    <td>{roles['assigned_by']}</td>
                    <td>{roles['created_at']}</td>
                  </tr>
                </div>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <NavBar />
    </>
  )
}

export default Roles
