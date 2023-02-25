import { useQuery } from '@tanstack/react-query'
import {
  collection,
  collectionGroup,
  getCountFromServer,
  getDocs,
  query,
  Timestamp,
  where
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { Visit, VolunteerStats } from '@/types/types'
import { visitSchema } from '@/types/zod/schema'

export const useVolunteerStatsByDateRange = (
  queryKey: string,
  startTime: Timestamp,
  endTime: Timestamp
) => {
  const queryFn = async () => {
    const usersRef = collection(db, 'users')
    const snapshot = await getCountFromServer(usersRef)
    const volunteerCount = snapshot.data().count

    const visitsRef = collectionGroup(db, 'visits')
    const q = query(
      visitsRef,
      where('startTime', '>=', startTime),
      where('startTime', '<=', endTime)
    )
    const visitDocs = await getDocs(q)

    let totalVisits = 0
    let totalDistCommuted = 0
    let totalDistWalked = 0
    let totalDurationMins = 0
    visitDocs.forEach((doc) => {
      const rawData = doc.data()
      const visitData = visitSchema.parse(rawData) as Visit
      totalVisits += 1
      totalDistCommuted += visitData.commuteDist
      totalDistWalked += visitData.walkDist
      totalDurationMins +=
        visitData.duration.hours * 60 + visitData.duration.minutes
    })

    const volunteerStats: VolunteerStats = {
      volunteerCount: volunteerCount,
      avgCommuteDistance: roundNum(totalDistCommuted / volunteerCount, 2),
      avgVisitCount: roundNum(totalVisits / volunteerCount, 2),
      avgWalkDistance: roundNum(totalDistWalked / volunteerCount, 2),
      avgWalkTime: roundNum(totalDurationMins / volunteerCount, 2),
      totalCommuteDistance: roundNum(totalDistCommuted),
      totalVisitCount: roundNum(totalVisits),
      totalWalkDistance: roundNum(totalDistWalked),
      totalWalkTime: roundNum(totalDurationMins)
    }

    return volunteerStats
  }

  return useQuery({
    queryKey: [queryKey, startTime, endTime],
    queryFn: queryFn,
    staleTime: Infinity,
    cacheTime: 1800000
  })
}

function roundNum(num: number, decimalPlaces = 0) {
  const p = Math.pow(10, decimalPlaces)
  return Math.round(num * p) / p
}
