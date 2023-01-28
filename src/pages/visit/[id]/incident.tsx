import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/solid'

import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import FormField from '@/components/Visit/formfield'
import { useAuth } from '@/context/Firebase/Auth/context'
import { IncidentForm } from '@/types/types'

const IncidentForm = () => {
  const { currentUser } = useAuth()
  const [userName, setUserName] = useState(
    currentUser?.displayName ? currentUser?.displayName : ''
  )
  const [email, setEmail] = useState(
    currentUser?.email ? currentUser?.email : ''
  )
  const [time, setTime] = useState('') //check issue comments for date/time
  const [notes, setNotes] = useState('')
  const [selectedImage, setSelectedImage] = useState<File>();
  const router = useRouter()
  let { pets } = router.query

  if (pets === undefined) pets = ''
  if (Array.isArray(pets)) pets = pets.length > 0 ? pets[0] : ''

  const [petName, setPetName] = useState(pets)

  const handleSubmit = (click: FormEvent<HTMLFormElement>) => {
    click.preventDefault()
    if (currentUser !== null) {
      const data: IncidentForm = {
        userID: currentUser.uid,
        userName: userName,
        email: email,
        petName: petName,
        time: time,
        details: notes
      }
      console.log(data)
      router.push('/visit')
    }
  }

  const isSubmitEnabled = () => {
    return currentUser?.uid && userName && email && petName && time && notes
  }

  return (
    <div className='z-50 p-4'>
        <div className='fixed right-5 top-4 z-[100] h-10 w-10 rounded-full bg-primary p-1 drop-shadow-default'>
          <Link href='/visit'>
            <button>
              <XMarkIcon className='h-full w-full text-white' />
            </button>
          </Link>
        </div>

        <div className='border-b-2 border-primary py-3 pt-10'>
          <h1 className='pl-2 text-2xl font-bold'>Add Your Incident</h1>
        </div>
        <div className='container mx-auto flex flex-col gap-2 p-2'>
          <form className='pt-3' onSubmit={handleSubmit}>
            <FormField
              id='userNameInput'
              type='text'
              placeholder={userName}
              label='Name'
              isRequired={false}
              onChange={(event) => setUserName(event.target.value)}
            />

            <FormField
              id='emailInput'
              type='email'
              placeholder={email}
              label='Email'
              isRequired={false}
              onChange={(event) => setEmail(event.target.value)}
            />


            <FormField
              id='petNameInput'
              type='text'
              placeholder={pets}
              label='Pet Name'
              isRequired={false}
              onChange={(event) => setPetName(event.target.value)}
            />

            <FormField
              id='timeInput'
              type='dateTime-local'
              placeholder='Time'
              label='Date & Time'
              isRequired={false}
              onChange={(event) => setTime(event.target.value)}
            />

            <FormField
              id='notesInput'
              type='textarea'
              placeholder='Add notes here'
              label='Description'
              isRequired={false}
              onChange={(event) => setNotes(event.target.value)}
            />

            <br />
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      {selectedImage && (
                        <div>
                        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                      <td>            
                        <Button
                          type='file'
                          name="UploadImage"
                          onChange={(event) => {
                            setSelectedImage(event.target.files[0]);
                          }}
                        >Upload
                        </Button>
                      </td>  
                      <td>
                        <Button 
                          className='col-span-2'
                          size='small' 
                          type='submit' 
                          onClick={()=>setSelectedImage(null)}>Remove</Button>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
            <br />
            <Button
              className='col-span-2'
              intent='primary'
              size='large' 
              type='submit' 
              fullwidth
              disabled={!isSubmitEnabled()}>
              Submit
            </Button>
          </form>
        </div>
    </div>
  )
}

export default withProtected(IncidentForm)
