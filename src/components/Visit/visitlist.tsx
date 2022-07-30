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

  const matchesClientName = (post: VisitData) =>
    userDoc.contacts[findContactIndex(post.clientId, userDoc)].clientName
      .toLowerCase()
      .includes(props.searchQuery.toLowerCase())

  //get pets from contact name
  const matchespetNames = (post: VisitData) =>
    post.petNames?.includes(props.searchQuery.toLowerCase())

  const matchesSearchTerms = (post: VisitData) =>
    matchesClientName(post) || matchespetNames(post)

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
              key={post.startTime + post.clientId + post.duration} // <-- dumb? or genius? (adam)
              id={index}
              {...post}
            />
          ))}
    </div>
  )
}

export default VisitList
