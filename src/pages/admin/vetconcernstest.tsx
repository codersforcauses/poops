import { useVetConcerns } from '@/hooks/vetconcerns'
import { formatTimestamp } from '@/utils'

const VetConcernsTest = () => {
  const { data: vetConcerns } = useVetConcerns()

  return (
    <div className='flex'>
      {vetConcerns && vetConcerns.length !== 0
        ? vetConcerns?.map((concern) => {
            return (
              <div key={concern.docId} className='m-2'>
                <p>docId: {concern.docId}</p>
                <p>details: {concern.detail}</p>
                <p>clientName: {concern.clientName}</p>
                <p>petName: {concern.petName}</p>
                <p>userEmail: {concern.userEmail}</p>
                <p>userId: {concern.userId}</p>
                <p>userPhone: {concern.userPhone}</p>
                <p>userVetName: {concern.vetName}</p>
                <p>visitId: {concern.visitId}</p>
                <p>visitTime: {formatTimestamp(concern.visitTime)}</p>
                <p>createdAt: {formatTimestamp(concern.createdAt)}</p>
              </div>
            )
          })
        : ''}
    </div>
  )
}

export default VetConcernsTest
