import { VisitData } from '@/types/types'

import VisitInstance from './visitinstance'

interface VisitListProps {
  searchQuery: string
}

const VisitList = (props: VisitListProps) => {
  const visitData: VisitData[] = [
    {
      type: 'Vet',
      displayName: 'Henry Smith',
      petNames: ['Chonk', 'Biscuit'],
      startTime: '12/06/2003T12:07',
      endTime: '13/06/2003T08:02',
      walkDist: 23,
      commuteDist: 124,
      commuteMethod: 'Car',
      notes: 'weeeeee'
    }
  ]

  const query = props.searchQuery.toLowerCase()

  const matchesDisplayName = (visit: VisitData) =>
    visit.displayName.toLowerCase().includes(query)

  const matchesPetNames = (visit: VisitData) =>
    visit.petNames.some((pet) => {
      return pet.toLowerCase().includes(query)
    })

  const matchesSearchTerms = (visit: VisitData) => {
    return matchesDisplayName(visit) || matchesPetNames(visit)
  }

  return (
    <div className=''>
      {visitData
        .filter((visit: VisitData) => {
          if (props.searchQuery === '' || matchesSearchTerms(visit)) {
            return visit
          }
        })
        .map((post, index) => (
          <VisitInstance
            key={index} // temporary
            id={index}
            type={post.type}
            displayName={post.displayName}
            petNames={post.petNames}
            endTime={post.endTime}
            startTime={post.startTime}
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
