import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { Timestamp } from 'firebase/firestore'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/UI/button'
import Form from '@/components/UI/FormComponents/Form'
import TextField from '@/components/UI/FormComponents/TextField'
import validationSchema from '@/components/Visit/IncidentForm/validation'
import { useAuth } from '@/context/Firebase/Auth/context'
import sendEmail from '@/hooks/email'
import { useMutateIncidents } from '@/hooks/incidents'
import { uploadImage } from '@/lib/storage/uploadImage'
import { Incident, Status } from '@/types/types'
import { formatTimestamp } from '@/utils'

interface FormValues {
  userName: string
  email: string
  petName: string
  time: string
  details: string
  photo: FileList
}

interface IncidentFormProps {
  docId: string
  clientName: string
  pets: string
  visitTime: Timestamp
}

const formatIncident = (data: Incident) => {
  return `Incident Report
User ID: ${data.userId}
Username: ${data.userName}
Email: ${data.email}
Created At: ${data.createdAt.toDate().toJSON()}

Client Name: ${data.clientName}
Pet Name: ${data.petName}
Visit ID: ${data.visitId}
Visit Time: ${data.visitTime.toDate().toJSON()}

Incident Time: ${data.time.toDate().toJSON()}
Details: ${data.details}`
}

const IncidentForm = (props: IncidentFormProps) => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const { mutate: mutateIncidents } = useMutateIncidents()
  const [photoUrl, setPhotoUrl] = useState('')

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const photoUrlString = URL.createObjectURL(file)
      setPhotoUrl(photoUrlString)
    } else {
      setPhotoUrl('')
    }
  }

  const handleSubmit: SubmitHandler<FormValues> = async (formData) => {
    if (!currentUser) return
    const { time, photo, ...rest } = formData
    let imageUrl: string | undefined
    if (photo.length > 0) {
      const photoItem = photo.item(0)
      if (photoItem && photoItem.type.match('image.*')) {
        imageUrl = await uploadImage(
          photoItem,
          currentUser.uid,
          'incident',
          time
        )
        if (photoItem && imageUrl === undefined) {
          console.error('Image upload failed')
        }
      }
    }
    const timeDate = new Date(time)
    const data: Incident = {
      ...rest,
      clientName: props.clientName,
      createdAt: Timestamp.fromDate(new Date()),
      time: Timestamp.fromDate(timeDate),
      userId: currentUser.uid,
      visitId: props.docId,
      visitTime: props.visitTime,
      status: Status.unresolved,
      ...(imageUrl && { imageUrl })
    }
    const message = {
      subject: 'Incident Report',
      text: formatIncident(data),
      ...(imageUrl && {
        attachments: [
          {
            filename: `${timeDate.toJSON()}.png`,
            path: imageUrl
          }
        ]
      })
    }
    mutateIncidents(data)
    await sendEmail(message)
    router.push('/visit')
  }

  return (
    <Form<FormValues>
      onSubmit={handleSubmit}
      defaultValues={
        currentUser
          ? {
              userName: currentUser.displayName || '',
              email: currentUser.email || '',
              time: formatTimestamp(props.visitTime),
              petName: props.pets
            }
          : {}
      }
    >
      <table className='container mx-auto table-fixed border-separate border-spacing-2'>
        <tbody>
          <tr className='align-top'>
            <td>
              <TextField
                name='userName'
                label='Name'
                type='text'
                rules={validationSchema.userName}
              />
            </td>
            <td>
              <TextField
                name='email'
                label='Email'
                type='email'
                rules={validationSchema.email}
              />
            </td>
          </tr>
          <tr className='align-top'>
            <td>
              <TextField
                name='petName'
                label='Pet Name'
                type='text'
                rules={validationSchema.petName}
              />
            </td>
            <td>
              <TextField
                name='time'
                label='Date & Time'
                type='dateTime-local'
                placeholder='Time'
                rules={validationSchema.time}
              />
            </td>
          </tr>
          <tr className='align-top'>
            <td colSpan={2}>
              <TextField
                name='details'
                label='Description'
                type='textarea'
                placeholder='Add notes here'
                rules={validationSchema.details}
              />
            </td>
          </tr>
          <tr className='align-top'>
            <td colSpan={2}>
              <TextField
                name='photo'
                label='Upload Photo'
                type='file'
                accept='image/*'
                rules={{ onChange: handleImageUpload }}
              />
            </td>
          </tr>
          <tr>
            <td>
              {photoUrl && (
                <Image
                  src={photoUrl}
                  alt='Uploaded Photo'
                  width={300}
                  height={300}
                  layout='responsive'
                  objectFit='contain'
                />
              )}
            </td>
          </tr>
          <tr className='align-top'>
            <td colSpan={2}>
              <Button type='submit' fullwidth>
                Submit
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Form>
  )
}

export default IncidentForm

export type IncidentFormValues = keyof Omit<FormValues, 'photo'>
