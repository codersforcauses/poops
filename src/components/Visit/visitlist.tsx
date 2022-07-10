import { useEffect, useState } from 'react'
import { getVisitData, Visit } from 'databaseintegration'

import VisitInstance from './visitinstance'

interface VisitListProps {
  searchQuery: string
}

const VisitList = (props: VisitListProps) => {
  const [visitData, setVisitData] = useState<Visit[]>([])

  useEffect(() => {
    const fetchData = () => getVisitData().then(setVisitData)
    fetchData()
  }, [])

  const matchesFirstName = (post: Visit) =>
    post.firstName.toLowerCase().includes(props.searchQuery.toLowerCase())

  const matchesLastName = (post: Visit) =>
    post.lastName.toLowerCase().includes(props.searchQuery.toLowerCase())

  const matchesPetName = (post: Visit) =>
    post.petName.toLowerCase().includes(props.searchQuery.toLowerCase())

  const matchesSearchTerms = (post: Visit) =>
    matchesFirstName(post) || matchesLastName(post) || matchesPetName(post)

  return (
    <div className=''>
      {visitData
        .filter((post: Visit) => {
          if (props.searchQuery === '' || matchesSearchTerms(post)) {
            return post
          }
        })
        .map((post) => (
          <VisitInstance
            key={post.id}
            id={post.id}
            firstName={post.firstName}
            lastName={post.lastName}
            petName={post.petName}
            duration={post.duration}
            dateTime={post.dateTime}
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
