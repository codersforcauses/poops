import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

import { db, storage } from '@/components/Firebase/init'
import { formatTimestampString } from '@/utils'

export interface uploadImageInterface {
  userID: string
  image: File
  folder: string
}

export interface addImageInterface {
  userName: string,
  email: string,
  petName: string,
  time: string,
  notes: string,
  imageBucket: string,
  destination: string
}

export const UploadImage = async ({ userID, image, folder }: uploadImageInterface) => {
  console.log('entered UploadImage')
  const extension = image.name.split('.').pop()
  if (extension !== undefined && extension.match(/jpg|jpeg|png|heic/)) {
    const formattedDate = formatTimestampString(Timestamp.now())
    const bucket = `${folder}/${userID}/${formattedDate}.${extension}`
    const storageRef = ref(storage, bucket)
    await uploadBytes(storageRef, image)
    return bucket
  }
}

export const AddImage = ({
  userName,
  email,
  petName,
  time,
  notes,
  imageBucket,
  destination
}: addImageInterface) => {
  addDoc(collection(db, destination), {userName, email, petName, time, notes, imageBucket})
}
