import { FormEvent, useState } from 'react'

import FormField from '@/components/Visit/formfield'

// TODO: add button to index to go here, and one here to go back, import docs and mod, add header to index?

const Roles = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (click: FormEvent<HTMLFormElement>) => {
    click.preventDefault()
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
