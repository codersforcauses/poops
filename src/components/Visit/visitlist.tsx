import { useEffect, useState } from 'react'

import { useFirestore } from '@/context/firestore'
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
  const indexCounter = 0
  useEffect(() => {
    setVisits(userDoc.visits)
  }, [userDoc.visits])

  const findAllContactIndex = (name: string) => {
    const indexes = []
    for (let i = 0; i < userDoc.contacts.length; i++) {
      if (userDoc.contacts[i].displayName === name) {
        indexes.push(i)
      }
    }
    return indexes
  }

  const matchesDisplayName = (post: VisitData) =>
    post.clientName.toLowerCase().includes(props.searchQuery.toLowerCase())

  //get pets from contact name
  const matchespetNames = (post: VisitData) =>
    userDoc.contacts[findAllContactIndex(post.clientName)[0]].pets.includes(
      props.searchQuery.toLowerCase()
    )

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
          .map(
            (post, index) => (
              <VisitInstance
                setVisits={setVisits}
                key={post.startTime + post.clientName + post.endTime} // <-- dumb? or genius?
                type={post.type}
                id={index}
                pets={
                  userDoc.contacts[
                    findAllContactIndex(post.clientName)[indexCounter]
                  ]?.pets
                }
                clientName={post.clientName}
                startTime={post.startTime}
                endTime={post.endTime}
                walkDist={post.walkDist}
                commuteDist={post.commuteDist}
                commuteMethod={post.commuteMethod}
                notes={post.notes}
                inProgress={post.inProgress}
              />
            )
            // indexCounter += 1 gotta do a check
          )}
    </div>
  )
}

export default VisitList
