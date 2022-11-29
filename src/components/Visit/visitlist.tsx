import { useEffect, useState } from 'react'

import { findContactIndex } from '@/components/Visit/utils'
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
    userDoc.contacts[findContactIndex(post.clientId, userDoc)].clientName
      .toLowerCase()
      .includes(props.searchQuery.toLowerCase())

  //get pets from contact name
  const matchespetNames = (post: VisitData) =>
    post.petNames?.includes(props.searchQuery.toLowerCase())

  const matchesSearchTerms = (post: VisitData) =>
    matchesDisplayName(post) || matchespetNames(post)

  return (
    <div>
      {visits &&
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
              clientId={post.clientId}
              clientName={post.clientName}
              petNames={post.petNames}
              startTime={post.startTime}
              duration={post.duration}
              walkDist={post.walkDist}
              commuteDist={post.commuteDist}
              commuteMethod={post.commuteMethod}
              notes={post.notes}
            />
          ))}
    </div>
  )
}

export default VisitList
