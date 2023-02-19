import { useRouter } from 'next/router'

import { withProtected } from '@/components/PrivateRoute'
import Button from '@/components/UI/button'
import FileUploader from '@/components/Visit/fileUploader'
import FormField from '@/components/Visit/formfield'
import { UploadImage, UploadImageInterface } from '@/lib/uploadImage'

const Vet = () => {
  // getting specific visit info
  // const { data: visits } = useVisits()

  // const { id: queryId } = router.query
  // const visitId =
  // queryId === undefined || Array.isArray(queryId) ? null : queryId
  // const visit = visits?.find((visit) => queryId && visit.docId === visitId)

  const [userName, setUserName] = useState(
    currentUser?.displayName ? currentUser?.displayName : ''
  )
  const [email, setEmail] = useState(
    currentUser?.email ? currentUser?.email : ''
  )
  const [vetName, setVetName] = useState('')
  const [time, setTime] = useState<Timestamp>(Timestamp.fromDate(new Date()))
  const [notes, setNotes] = useState('')

  const router = useRouter()
  let { pets } = router.query
  const { client, visitId } = router.query

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

  // const userId = useRef('')
  // const userPhone = useRef('')
  // const client = useRef('')

  // useEffect(() => {
  //   // prefilling any form values.
  //   if (visit === undefined || currentUser == null) return

  //   const { petNames, startTime, clientName } = visit

  //   const displayName = currentUser.displayName ?? ''
  //   const email = currentUser.email ?? ''
  //   const visitTime = formatTimestamp(startTime)

  //   if (userName === '') {
  //     setUserName(displayName)
  //   }
  //   if (email === '') {
  //     setEmail(email)
  //   }
  //   if (time === '') {
  //     setTime(visitTime ?? '')
  //   }
  //   if (petName === '') {
  //     setPetName(petNames)
  //   }

  //   userId.current = currentUser.uid
  //   userPhone.current = currentUser.phoneNumber ? currentUser.phoneNumber : ''
  //   client.current = clientName
  // }, [userName, email, time, petName, visit, currentUser])

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
        vetName: vetName,
        reportTime: time,
        detail: notes,
        createdAt: Date.now().toString(),
        image: image ?? new File([''], 'default'),
        folder: 'vet_concerns'
      }
      UploadImage(imageData)
      router.push('/visit')
    }
  }
  //   mutateVetConcerns(data)

  //   if (image !== undefined && visitId !== null) {
  //     const imageData: UploadImageInterface = {
  //       userID: userId.current,
  //       visitID: visitId,
  //       name: userName,
  //       email: email,
  //       pet: petName,
  //       doctor: vetName,
  //       time: time,
  //       notes: notes,
  //       image: image,
  //       folder: 'vet_concerns'
  //     }

  //     UploadImage(imageData)
  //   }

  //   router.push('/visit')
  // }

  const handleFile = async (file: File) => {
    if (currentUser !== null) {
      setImage(file)
      console.log(file.name)
    }
  }

  const isSubmitEnabled = () => {
    return (
      currentUser?.uid &&
      userName &&
      email &&
      petName &&
      time &&
      notes &&
      vetName
    )
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
        <h1 className='pl-2 text-2xl font-bold'>Register a Vet Concern</h1>
      </div>
      <div className='container flex max-h-screen flex-col gap-2 overflow-y-auto p-2'>
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

export default withProtected(Vet)
