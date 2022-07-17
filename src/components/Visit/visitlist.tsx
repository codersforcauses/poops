import { useFirestore } from '@/context/firestore'
import { VisitData } from '@/types/types'

import VisitInstance from './visitinstance'

interface VisitListProps {
  searchQuery: string
}

const VisitList = (props: VisitListProps) => {
  // const [visitData, setVisitData] = useState<VisitData[]>([])
  const { userDoc } = useFirestore()

  // TODO split display name for better searching
  const matchesDisplayName = (post: VisitData) =>
    post.displayName.toLowerCase().includes(props.searchQuery.toLowerCase())

  const matchespetNames = (post: VisitData) =>
    post.petNames.forEach((petName) =>
      petName.toLowerCase().includes(props.searchQuery.toLowerCase())
    )

  const matchesSearchTerms = (post: VisitData) =>
    matchesDisplayName(post) || matchespetNames(post)

  return (
    <div className=''>
      {userDoc.visits
        .filter((post: VisitData) => {
          if (props.searchQuery === '' || matchesSearchTerms(post)) {
            return post
          }
        })
        .map((post, index) => (
          <VisitInstance
            key={index}
            type={post.type}
            id={index}
            displayName={post.displayName}
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
