import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { ResolverSuccess } from 'react-hook-form'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import TopNav from '@/components/TopNav'
import Button from '@/components/UI/button'
import FormField from '@/components/Visit/formfield'

import ROLES_DATA from '../../../mockData/ROLES_DATA.json'

// TODO: import docs and mod, add header to index?
// TODO: onsubmit add user to mockdata, should update table
// TODO: style for mobile view

const Roles = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (click: FormEvent<HTMLFormElement>) => {
    click.preventDefault()

    const addPriviliegeAcess = {
      email: email,
      roles: { admin: true }
    }

    fetch('/api/setRole', {
      method: 'POST',
      body: JSON.stringify(addPriviliegeAcess)
    })

    console.log('gave admin to: ' + email)
  }

  return (
    <>
      <Header pageTitle='Roles' />
      <TopNav />
      <h1 className='m-3 flex-1 text-center text-2xl'>Roles</h1>
      <form onSubmit={handleSubmit} className='m-auto mb-5 w-1/2 rounded-lg'>
        <FormField
          id='emailInput'
          type='email'
          placeholder='email required'
          label='Give admin to:'
          isRequired={true}
          onChange={(event) => setEmail(event.target.value)}
        />
      </form>

      <div className='overflow-scroll'>
        <table className='border-slate-700 m-auto border-separate border-spacing-3 border'>
          <thead>
            <tr className='text-center'>
              <th>Id</th>
              <th>Role</th>
              <th>Assigned By</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {ROLES_DATA.map((roles, i) => (
              <tr key={i}>
                <td>{roles['id']}</td>
                <td className='text-center'>{roles['roles']}</td>
                <td>{roles['assigned_by']}</td>
                <td>{roles['created_at']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NavBar />
    </>
  )
}

export default Roles
