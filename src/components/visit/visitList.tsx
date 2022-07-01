import { useState } from 'react'
import { getVisitData, Visit } from 'databaseIntigration'

import VisitInstance from './visitInstance'
// dylan update?
// i'm attemptping to refactor visit list because i'm trying to use useEffect but that requires a function componennt
// you too loser
// love you too have you won yet
// aww baby cant get getdata to work
// fuck u tioo far
// <3
// fuck yeah, no idea how people die in the first round

// real
interface VisitListProps {
  searchQuery: string
}

export default function VisitList(props: VisitListProps) {
  const [isLoading, setIsLoading] = useState(true) //im taking credit for this bit
  // ok nerd
  const [visitData, setVisitData] = useState<Visit[]>([])

  const fetchData = async () => {
    const response: Visit[] = await getVisitData()
    setVisitData(response)
  }

  if (isLoading) {
    fetchData()
    setIsLoading(false)
  }

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
