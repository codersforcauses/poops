import { useEffect, useState } from 'react'

import { useFirestore } from '@/context/Firebase/Firestore/context'
import { SelectOption, VisitData } from '@/types/types'

import VisitInstance from './visitinstance'

export const visitSelectOptions: SelectOption[] = [
  { label: 'Vet', value: 'Vet' },
  { label: 'Walk', value: 'Walk' }
]

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
    post.clientName.toLowerCase().includes(props.searchQuery.toLowerCase())

  const matchespetNames = (post: VisitData) =>
    post.petNames.toLowerCase().includes(props.searchQuery.toLowerCase())

  const matchesSearchTerms = (post: VisitData) =>
    matchesClientName(post) || matchespetNames(post)

  return (
    <div className=''>
      {visits &&
        visits
          .filter((post: VisitData) => {
            if (props.searchQuery === '' || matchesSearchTerms(post)) {
              return post
            }
          })
          .map((post, index) => (
            <VisitInstance
              set={setVisits}
              key={post.startTime + post.clientName + post.petNames} // <-- dumb? or genius?
              type={post.type}
              id={index}
              clientName={post.clientName}
              petNames={post.petNames}
              startTime={post.startTime}
              endTime={post.endTime}
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
