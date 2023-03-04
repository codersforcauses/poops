import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { storage } from '@/components/Firebase/init'

// Uploads image and returns the storage bucket
export const uploadImage = async (
  image: File,
  uid: string,
  reportType: 'incident' | 'vetConcern',
  time: string
) => {
  const createdDate = new Date().toJSON()
  const formattedDate = new Date(time).toJSON()
  const bucket = `${reportType}/${uid}/${createdDate}/${formattedDate}.jpg`
  const imageRef = ref(storage, bucket)
  await uploadBytes(imageRef, image)
  const imageUrl = await getDownloadURL(imageRef)
  return imageUrl
}
