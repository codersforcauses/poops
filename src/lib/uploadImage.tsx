import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

import { db, storage } from '@/components/Firebase/init'
import { formatTimestampString } from '@/utils'

export interface ImageToStorageInterface {
  userID: string
  image: File
  folder: string
}

export const ImageToStorage = async ({
  userID,
  image,
  folder
}: ImageToStorageInterface) => {
  const extension = image.name.split('.').pop()
  if (extension !== undefined && extension.match(/jpg|jpeg|png|heic/)) {
    const formattedDate = formatTimestampString(Timestamp.now())
    const bucket = `${folder}/${userID}/${formattedDate}.${extension}`
    const storageRef = ref(storage, bucket)
    await uploadBytes(storageRef, image)
    return bucket
  }
}

export interface ImageToFirestoreInterface {
  name: string
  email: string
  pet: string
  doctor?: string
  time: string
  notes: string
  imageBucket: string
  destination: string
  folder?: string
}

export const ImageToFirestore = ({
  name,
  email,
  pet,
  doctor,
  time,
  notes,
  imageBucket,
  destination,
  folder = 'incidents'
}: ImageToFirestoreInterface) => {
  console.log(destination)
  if (folder === 'vet') {
    addDoc(collection(db, destination), {
      name,
      email,
      pet,
      doctor,
      time,
      notes,
      imageBucket
    })
  }
  if (folder === 'incidents') {
    addDoc(collection(db, destination), {
      name,
      email,
      pet,
      time,
      notes,
      imageBucket
    })
  }
}

export interface UploadImageInterface {
  userID: string
  visitID: string
  name: string
  email: string
  pet: string
  doctor?: string
  time: string
  notes: string
  image: File
  folder: string
}

export const UploadImage = async ({
  userID,
  visitID,
  name,
  email,
  pet,
  doctor,
  time,
  notes,
  image,
  folder
}: UploadImageInterface) => {
  try {
    const bucket = await ImageToStorage({
      userID,
      image,
      folder
    })
    if (bucket !== undefined) {
      const dest = `users/${userID}/visits/${visitID}/${folder}`
      ImageToFirestore({
        name,
        email,
        pet,
        doctor,
        time,
        notes,
        imageBucket: bucket,
        destination: dest,
        folder
      })
    }
  } catch (error) {
    console.log(error)
  }
}
