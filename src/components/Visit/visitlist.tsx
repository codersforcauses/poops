import { useEffect, useState } from 'react'

import { useFirestore } from '@/context/firestore'
import { SelectOption, UserData, VisitData } from '@/types/types'

import VisitInstance from './visitinstance'

export const visitSelectOptions: SelectOption[] = [
  { label: 'Vet', value: 'Vet' },
  { label: 'Walk', value: 'Walk' }
]

interface VisitListProps {
  searchQuery: string
}

export const findContactIndex = (id: string, userDoc: UserData) => {
  //TODO: find better spot
  for (let i = 0; i < userDoc.contacts.length; i++) {
    if (userDoc.contacts[i].id === id) {
      return i
    }
  }
  return 0
}

export const VisitList = (props: VisitListProps) => {
  const { userDoc } = useFirestore()
  const [visits, setVisits] = useState(userDoc.visits || [])
  useEffect(() => {
    setVisits(userDoc.visits)
  }, [userDoc.visits])

  const matchesDisplayName = (post: VisitData) =>
    userDoc.contacts[findContactIndex(post.clientId, userDoc)].displayName
      .toLowerCase()
      .includes(props.searchQuery.toLowerCase())

  //get pets from contact name
  const matchespetNames = (post: VisitData) =>
    post.petNames.includes(props.searchQuery.toLowerCase())

  const matchesSearchTerms = (post: VisitData) =>
    matchesDisplayName(post) || matchespetNames(post)

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
              key={post.startTime + post.clientId + post.endTime} // <-- dumb? or genius?
              type={post.type}
              id={index}
              petNames={post.petNames}
              clientId={post.clientId}
              startTime={post.startTime}
              endTime={post.endTime}
              walkDist={post.walkDist}
              commuteDist={post.commuteDist}
              commuteMethod={post.commuteMethod}
              notes={post.notes}
              inProgress={post.inProgress}
            />
          ))}
    </div>
  )
}

export default VisitList
