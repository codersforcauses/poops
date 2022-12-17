import { FormEvent, useState } from 'react'
import { XIcon } from '@heroicons/react/solid'

import { IncidentForm } from '@/types/types'

import FormField from './formfield'
import Button from '../UI/button'
import { useVisit } from '@/context/VisitContext/context'

const IncidentForm = () => {
  const [userID, setUserID] = useState('') //get from firebase auth, not form
  const [userName, setUserName] = useState('') //could just get username and email from login?
  const [email, setEmail] = useState('')
  const [petName, setPetName] = useState('')
  const [time, setTime] = useState('') //check issue comments for date/time
  const [notes, setNotes] = useState('')
  const { setCurrentForm } = useVisit()

  const handleSubmit = (click: FormEvent<HTMLFormElement>) => {
    click.preventDefault()
    const data: IncidentForm = {
      userID: userID,
      userName: userName,
      email: email,
      petName: petName,
      time: time,
      details: notes
    }
    console.log(data)
    setCurrentForm(null)
  }

  const isSubmitEnabled = () => {
    return userID && userName && email && petName && time && notes
  }

  return (
    <div className='z-50 p-4'>
      <>
        <div className='fixed right-5 top-4 z-[100] h-10 w-10 rounded-full bg-primary p-1 drop-shadow-default'>
          <button onClick={() => setCurrentForm(null)}>
            <XIcon className='h-full w-full text-white' />
          </button>
        </div>

        <div className='border-b-2 border-primary py-3 pt-10'>
          <h1 className='pl-2 text-2xl font-bold'>Add Your Incident</h1>
        </div>

        <form className='pt-3' onSubmit={handleSubmit}>
          <table className='container mx-auto table-fixed'>
            <tbody>
              <tr>
                <td>
                  <FormField
                    id='userID'
                    type='text'
                    placeholder='userID'
                    label='UserID:'
                    isRequired={true}
                    onChange={(event) => setUserID(event.target.value)}
                  />
                </td>
                <td>
                  <FormField
                    id='emailInput'
                    type='email'
                    placeholder='email'
                    label='User Email'
                    isRequired={true}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormField
                    id='userNameInput'
                    type='text'
                    placeholder='username'
                    label='User Name'
                    isRequired={true}
                    onChange={(event) => setUserName(event.target.value)}
                  />
                </td>
                <td>
                  <FormField
                    id='petNameInput'
                    type='text'
                    placeholder='Pet name'
                    label='Pet Name'
                    isRequired={true}
                    onChange={(event) => setPetName(event.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <FormField
            id='timeInput'
            type='dateTime-local'
            placeholder='Time'
            label='Date & Time'
            isRequired={true}
            onChange={(event) => setTime(event.target.value)}
          />
          <FormField
            id='notesInput'
            type='textarea'
            placeholder='Add notes here'
            label='Description'
            isRequired={true}
            onChange={(event) => setNotes(event.target.value)}
          />
          <div className='mx-auto my-2 flex flex-col p-1 '>
            <Button type='submit' disabled={!isSubmitEnabled()}>
              Submit
            </Button>
          </div>
        </form>
      </>
    </div>
  )
}

export default IncidentForm
