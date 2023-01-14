import { FormEvent, useState } from 'react'

import FormField from '@/components/Visit/formfield'

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

      {/* table listing admins and schema data */}
    </>
  )
}

export default Roles
