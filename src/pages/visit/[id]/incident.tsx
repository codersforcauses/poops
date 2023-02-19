import { useRouter } from 'next/router'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Timestamp } from 'firebase/firestore'

import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import FileUploader from '@/components/Visit/fileUploader'
import FormField from '@/components/Visit/formfield'
import { useAuth } from '@/context/Firebase/Auth/context'
import { useMutateIncidents } from '@/hooks/incidents'
import { UploadImage, UploadImageInterface } from '@/lib/uploadImage'

const Incident = () => {
  const { currentUser } = useAuth()
  const { mutate: mutateIncidents } = useMutateIncidents()

  const [userName, setUserName] = useState(
    currentUser?.displayName ? currentUser?.displayName : ''
  )
  const [email, setEmail] = useState(
    currentUser?.email ? currentUser?.email : ''
  )
  const [time, setTime] = useState<Timestamp>(Timestamp.fromDate(new Date())) //check issue comments for date/time
  const [notes, setNotes] = useState('')
  const router = useRouter()

  if (pets === undefined) pets = ''
  if (Array.isArray(pets)) pets = pets.length > 0 ? pets[0] : ''

  let clientName = ''
  if (Array.isArray(client)) clientName = client.length > 0 ? client[0] : ''
  else if (client) clientName = client

  let docId = ''
  if (Array.isArray(visitId)) docId = visitId.length > 0 ? visitId[0] : ''
  else if (visitId) docId = visitId

  const [petName, setPetName] = useState(pets)

  const [image, setImage] = useState<File>()

  const handleSubmit = (click: FormEvent<HTMLFormElement>) => {
    click.preventDefault()
    if (currentUser !== null) {
      const imageData: UploadImageInterface = {
        userId: currentUser.uid,
        userName: userName,
        clientName: clientName,
        visitId: docId,
        visitTime: time,
        email: email,
        petName: petName,
        reportTime: time,
        detail: notes,
        createdAt: Date.now().toString(),
        image: image ?? new File([''], 'default'),
        folder: 'incidents'
      }
      UploadImage(imageData)
      router.push('/visit')
    }
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
    <div className='flex max-h-screen flex-col overflow-y-auto p-4'>
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

      <div className='container flex max-h-screen flex-col gap-2 overflow-y-auto p-2'>
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
            onChange={(event) => {
              const dateTime = new Date(event.target.value)
              setTime(Timestamp.fromDate(dateTime))
            }}
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
                    width='200px'
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
    </div>
  )
}

export default withProtected(Incident)
