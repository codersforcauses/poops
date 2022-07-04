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
    <div className='h-0 shrink grow overflow-y-auto'>
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
            date={post.date}
            distance={post.distance}
            // number={post.number}
            // travelled={post.travelled}
            // walkMetres={post.walkMetres}
            // commuteMetres={post.commuteMetres}
            // method={post.method}
          />
        ))}
    </div>
  )
}
