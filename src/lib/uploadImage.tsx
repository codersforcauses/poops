import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

import { db, storage } from '@/components/Firebase/init'
import { formatTimestampString } from '@/utils'

export interface ImageToStorageInterface {
  userId: string
  image: File
  folder: string
}

export const ImageToStorage = async ({
  userId,
  image,
  folder
}: ImageToStorageInterface) => {
  const extension = image.name.split('.').pop()
  if (extension !== undefined && extension.match(/jpg|jpeg|png|heic/)) {
    const formattedDate = formatTimestampString(Timestamp.now())
    const bucket = `${folder}/${userId}/${formattedDate}.${extension}`
    const storageRef = ref(storage, bucket)
    await uploadBytes(storageRef, image)
    return bucket
  }
}

export interface ImageToFirestoreInterface {
  clientName: string
  email: string
  petName: string
  doctor?: string
  time: Timestamp
  detail: string
  imageBucket: string
  destination: string
  folder?: string
}

export const ImageToFirestore = ({
  clientName,
  email,
  petName,
  doctor,
  time,
  detail,
  imageBucket,
  destination,
  folder = 'incidents'
}: ImageToFirestoreInterface) => {
  console.log(destination)
  if (folder === 'vet_concerns') {
    addDoc(collection(db, destination), {
      clientName,
      email,
      petName,
      doctor,
      time,
      detail,
      imageBucket
    })
  }
  if (folder === 'incidents') {
    addDoc(collection(db, destination), {
      clientName,
      email,
      petName,
      time,
      detail,
      imageBucket
    })
  }
}

export interface UploadImageInterface {
  userId: string
  userName: string
  visitId: string
  visitTime: Timestamp
  clientName: string
  email: string
  petName: string
  doctor?: string
  time: Timestamp
  detail: string
  image: File
  createdAt: string
  folder: string
}

export const UploadImage = async ({
  userId,
  visitId,
  clientName,
  email,
  petName,
  doctor,
  time,
  detail,
  image,
  folder
}: UploadImageInterface) => {
  try {
    const bucket = await ImageToStorage({
      userId,
      image,
      folder
    })
    // if (bucket !== undefined) {
    const dest = `users/${userId}/visits/${visitId}/${folder}`
    ImageToFirestore({
      clientName,
      email,
      petName,
      doctor,
      time,
      detail,
      imageBucket: bucket ?? '',
      destination: dest,
      folder
    })
    // }
  } catch (error) {
    console.log(error)
  }
}
