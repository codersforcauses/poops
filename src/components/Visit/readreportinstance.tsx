import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router'
import { serverTimestamp, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref } from "firebase/storage";
import moment from 'moment'

import { storage } from '@/components/Firebase/init'
import Button from '@/components/UI/button'
import { Incident } from '@/types/types'

interface ReportInfoProps extends Incident {
  isOpen: boolean
}

const ReportInfo = ({
  isOpen,
  docId = '',
  imageBucket = '',
  clientName = '',
  petName = '',
  reportTime = serverTimestamp() as Timestamp,
  detail = ''
}: ReportInfoProps) => {
  const router = useRouter()
  const params = `pets=${petName}&client=${clientName}&visitId=${docId}`
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (imageBucket === '') return; // Return early if imageBucket is empty
    // Create a reference to the file
    const storageRef = ref(storage, imageBucket);

    // Get the download URL of the file
    getDownloadURL(storageRef)
      .then((url) => {
        // Use the URL to display the image on your website
        setImageUrl(url)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  if (docId === undefined) return null

  return (
    <>
      <div
        className={`mt-2 justify-between text-sm transition-all duration-300 ${
          isOpen ? '' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className='max-h-screen space-y-1'>
          <div className='space-x-1'>
            <span className='font-semibold'>Pet Name:</span>
            <span>{petName}</span>
          </div>
          <div className='space-x-1'>
            <span className='font-semibold'>Report Date & Time:</span>
            <span>{moment(reportTime.toDate()).format("YYYY-MM-DD HH:mm:ss").toString()}</span>
          </div>
          <div>
            <div className='font-semibold'>Desscription:</div>
            <p className='my-1 line-clamp-6'>{detail}</p>
          </div>
          <div>
            <div className='font-semibold'>Photo:</div>
            <p>{imageBucket}</p>
            <div>
              {imageUrl ? (<img src={imageUrl} alt='Download from Firestorage' />) : (<p>Loading image...</p>)}</div>
          </div>
        </div>
        <div className='flex items-center justify-around py-2'>
          <div className='w-fit'>
            <Button
              size='small'
              onClick={() => router.push(`/visit/${docId}/report?${params}`)}
            >
              Remove
            </Button>
          </div>
          <div className='w-fit'>
            <Button
              size='small'
              onClick={() => router.push(`/visit/${docId}/report?${params}`)}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportInfo
