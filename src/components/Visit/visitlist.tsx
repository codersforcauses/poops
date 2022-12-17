import { useEffect, useState } from 'react'
import { XCircleIcon } from '@heroicons/react/outline'

import { useFirestore } from '@/context/Firebase/Firestore/context'
import { VisitData } from '@/types/types'

import VisitInstance from './visitinstance'

interface VisitListProps {
  searchQuery: string
}

export const VisitList = (props: VisitListProps) => {
  const { userDoc } = useFirestore()
  const [visits, setVisits] = useState(userDoc.visits || [])
  useEffect(() => {
    setVisits(userDoc.visits)
  }, [userDoc.visits])

  const matchesDisplayName = (post: VisitData) =>
    post.clientName.toLowerCase().includes(props.searchQuery.toLowerCase())

  //get pets from contact name
  const matchespetNames = (post: VisitData) =>
    post.petNames?.toLowerCase().includes(props.searchQuery.toLowerCase())

  const matchesSearchTerms = (post: VisitData) =>
    matchesDisplayName(post) || matchespetNames(post)

  return (
    <div className='m-2 h-full flex-col'>
      {visits && visits.length !== 0 ? (
        visits
          .filter((post: VisitData) => {
            if (props.searchQuery === '' || matchesSearchTerms(post)) {
              return post
            }
          })
          .map((post, index) => (
            <VisitInstance
              setVisits={setVisits}
              key={post.startTime + post.clientName + post.petNames} // <-- dumb? or genius?
              type={post.type}
              id={index}
              clientName={post.clientName}
              petNames={post.petNames}
              startTime={post.startTime}
              duration={post.duration}
              walkDist={post.walkDist}
              commuteDist={post.commuteDist}
              commuteMethod={post.commuteMethod}
              notes={post.notes}
            />
          ))
      ) : (
        <div className='flex h-full flex-col items-center justify-center'>
          <XCircleIcon className='h-16 w-16 content-center' />
          <p>It&apos;s empty here. Add a visit! </p>
        </div>
      )}
    </div>
  )
}

export default VisitList
