import { Timestamp } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

import { storage } from '@/components/Firebase/init'
import { formatTimestampString } from '@/utils'

export interface uploadImageInterface {
  userID: string
  image: File
  folder: string
}

const UploadImage = async ({ userID, image, folder }: uploadImageInterface) => {
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

export default UploadImage
