import { useEffect, useState } from 'react'
import { getVisitData, Visit } from 'databaseIntigration'

import VisitInstance from './visitInstance'

interface VisitListProps {
  searchQuery: string
}

export default function VisitList(props: VisitListProps) {
  const [visitData, setVisitData] = useState<Visit[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response: Visit[] = await getVisitData()
      setVisitData(response)
    }
    fetchData()
  }, [])

  return (
    <div className=''>
      {visitData
        .filter((post: Visit) => {
          if (
            props.searchQuery === '' ||
            post.firstName
              .toLowerCase()
              .includes(props.searchQuery.toLowerCase()) ||
            post.lastName
              .toLowerCase()
              .includes(props.searchQuery.toLowerCase()) ||
            post.petName.toLowerCase().includes(props.searchQuery.toLowerCase())
          ) {
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
