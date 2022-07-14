import { useEffect, useState } from 'react'

import { VisitData } from '@/interfaces/interfaces.tsx'

import VisitInstance from './visitinstance'

interface VisitListProps {
  searchQuery: string
}

const VisitList = (props: VisitListProps) => {
  const [visitData, setVisitData] = useState<VisitData[]>([])

  useEffect(() => {
    const fetchData = () => getVisitData().then(setVisitData)
    fetchData()
  }, [])

  const matchesFirstName = (post: VisitData) =>
    post.firstName.toLowerCase().includes(props.searchQuery.toLowerCase())

  const matchesLastName = (post: VisitData) =>
    post.lastName.toLowerCase().includes(props.searchQuery.toLowerCase())

  const matchespetNames = (post: VisitData) =>
    post.petNames.toLowerCase().includes(props.searchQuery.toLowerCase())

  const matchesSearchTerms = (post: VisitData) =>
    matchesFirstName(post) || matchesLastName(post) || matchespetNames(post)

  return (
    <div className=''>
      {visitData
        .filter((post: VisitData) => {
          if (props.searchQuery === '' || matchesSearchTerms(post)) {
            return post
          }
        })
        .map((post, index) => (
          <VisitInstance
            key={index}
            id={index}
            firstName={post.firstName}
            lastName={post.lastName}
            petNames={post.petNames}
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
