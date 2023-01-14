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

//? onsubmit add user to mockdata, should update table

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
      <form onSubmit={handleSubmit}>
        <FormField
          id='emailInput'
          type='email'
          placeholder='email required'
          label='Give admin to:'
          isRequired={true}
          onChange={(event) => setEmail(event.target.value)}
        />
      </form>

      {/* use roles data as array (of js objects) to populate table */}
      {/* ROLES_DATA.forEach create row or try map  */}

      <table className='border-slate-700 border-separate border-spacing-3 border'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Roles</th>
            <th>Assigned By</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {ROLES_DATA.map((roles, i) => (
            <tr key={i}>
              <td>{roles['id']}</td>
              <td>{roles['roles']}</td>
              <td>{roles['assigned_by']}</td>
              <td>{roles['created_at']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <NavBar />
    </>
  )
}

export default Roles
