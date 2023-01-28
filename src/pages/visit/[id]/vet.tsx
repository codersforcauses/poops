import { FormEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Timestamp } from 'firebase/firestore'

import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import FileUploader from '@/components/Visit/fileUploader'
import FormField from '@/components/Visit/formfield'
import { useAuth } from '@/context/Firebase/Auth/context'
import { useMutateVetConcerns } from '@/hooks/vetconcerns'
import { useVisits } from '@/hooks/visits'
import { UploadImage, UploadImageInterface } from '@/lib/uploadImage'
import { VetConcern } from '@/types/types'
import { formatTimestamp } from '@/utils'

const VetForm = () => {
  const { currentUser } = useAuth()
  const { mutate: mutateVetConcerns } = useMutateVetConcerns()

  // getting specific visit info
  const { data: visits } = useVisits()
  const router = useRouter()
  const { id: queryId } = router.query
  const visitId =
    queryId === undefined || Array.isArray(queryId) ? null : queryId
  const visit = visits?.find((visit) => queryId && visit.docId === visitId)

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [vetName, setVetName] = useState('')
  const [time, setTime] = useState('') //check issue comments for date/time
  const [notes, setNotes] = useState('')
  const [petName, setPetName] = useState('')
  const [image, setImage] = useState<File>()

  const userId = useRef('')
  const userPhone = useRef('')
  const client = useRef('')

  useEffect(() => {
    // prefilling any form values.
    if (visit === undefined || currentUser == null) return

    const { petNames, startTime, clientName } = visit

    const displayName = currentUser.displayName ?? ''
    const email = currentUser.email ?? ''
    const visitTime = formatTimestamp(startTime)

    if (userName === '') {
      setUserName(displayName)
    }
    if (email === '') {
      setEmail(email)
    }
    if (time === '') {
      setTime(visitTime ?? '')
    }
    if (petName === '') {
      setPetName(petNames)
    }

    userId.current = currentUser.uid
    userPhone.current = currentUser.phoneNumber ? currentUser.phoneNumber : ''
    client.current = clientName
  }, [userName, email, time, petName, visit, currentUser])

  const handleSubmit = (click: FormEvent<HTMLFormElement>) => {
    click.preventDefault()
    const data: VetConcern = {
      userId: userId.current,
      userName: userName,
      userEmail: email,
      userPhone: userPhone.current,
      clientName: client.current,
      petName: petName,
      vetName: vetName,
      visitTime: Timestamp.fromDate(new Date(time)),
      visitId: visitId ? visitId : '',
      detail: notes,
      createdAt: Timestamp.fromDate(new Date())
    }

    mutateVetConcerns(data)

    if (image !== undefined && visitId !== null) {
      const imageData: UploadImageInterface = {
        userID: userId.current,
        visitID: visitId,
        name: userName,
        email: email,
        pet: petName,
        doctor: vetName,
        time: time,
        notes: notes,
        image: image,
        folder: 'vet_concerns'
      }

      UploadImage(imageData)
    }

    router.push('/visit')
  }

  const handleFile = async (file: File) => {
    if (currentUser !== null) {
      setImage(file)
      console.log(file.name)
    }
  }

  const isSubmitEnabled = () => {
    return currentUser?.uid && userName && email && petName && time && notes
  }

  return (
    <div className='flex w-screen flex-col p-4'>
      <div className='fixed right-5 top-4 z-[100] h-10 w-10 rounded-full bg-primary p-1 drop-shadow-default'>
        <Link href='/visit'>
          <button>
            <XMarkIcon className='h-full w-full text-white' />
          </button>
        </Link>
      </div>

      <div className='border-b-2 border-primary py-3 pt-10'>
        <h1 className='pl-2 text-2xl font-bold'>Register a Vet Concern</h1>
      </div>

      <form className='pt-3' onSubmit={handleSubmit}>
        <FormField
          id='userNameInput'
          type='text'
          value={userName}
          placeholder='Username'
          label='Name'
          isRequired={false}
          onChange={(event) => setUserName(event.target.value)}
        />

        <FormField
          id='emailInput'
          type='email'
          value={email}
          placeholder='Email'
          label='Email'
          isRequired={false}
          onChange={(event) => setEmail(event.target.value)}
        />

        <FormField
          id='petNameInput'
          type='text'
          value={petName}
          placeholder='Pet name'
          label='Pet Name'
          isRequired={false}
          onChange={(event) => setPetName(event.target.value)}
        />

        <FormField
          id='vetNameInput'
          type='text'
          placeholder='Vet name'
          label='Vet Name'
          isRequired={false}
          onChange={(event) => setVetName(event.target.value)}
        />

        <FormField
          id='timeInput'
          type='dateTime-local'
          value={time}
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
        <div>
          <div className='font-semibold'>Photo:</div>
          <div>
            {image && (
              <div>
                <img
                  alt='not fount'
                  width={'250px'}
                  src={URL.createObjectURL(image)}
                />
              </div>
            )}
          </div>
          <div>
            <FileUploader label='Upload Image' handleFile={handleFile} />
          </div>
        </div>
        <div className='mx-auto my-2 flex flex-col p-1 '>
          <Button type='submit' disabled={!isSubmitEnabled()}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default withProtected(VetForm)
