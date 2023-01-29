/* eslint-disable no-console */
import { useQuery } from '@tanstack/react-query'
import {
  collection,
  collectionGroup,
  FirestoreError,
  getCountFromServer,
  getDocs,
  query,
  Timestamp,
  where
} from 'firebase/firestore'

import { db } from '@/components/Firebase/init'
import { VolunteerStats } from '@/types/types'

export const useVolunteerStatsByDateRange = (startTime: Timestamp, endTime: Timestamp) => {
  const queryFn = async () => {
      try {
        // volunteer count 
        const usersRef = collection(db, 'users')
        const snapshot = await getCountFromServer(usersRef)
        const volunteerCount = snapshot.data().count
        
        // visits with date range
        const visitsRef = collectionGroup(db, 'visits')
        const q = query(visitsRef, where('startTime', '>=', startTime), where('startTime', '<=', endTime))
        const visitDocs = await getDocs(q)
        
        let totalVisits = 0
        let totalDistCommuted = 0
        let totalDistWalked = 0
        let totalDurationMins = 0
        visitDocs.forEach((doc) => {
          const visitData = doc.data()
          totalVisits += 1;
          totalDistCommuted += visitData.commuteDist
          totalDistWalked += visitData.walkDist
          totalDurationMins += visitData.duration.hours * 60 + visitData.duration.minute
        })

        const volunteerStats : VolunteerStats = {
          volunteerCount: volunteerCount,
          avgClientCount: 0, //TODO: GeeGee 
          avgCommuteDistance: totalDistCommuted / volunteerCount,
          avgVisitCount: totalVisits / volunteerCount,
          avgWalkDistance: totalDistWalked / volunteerCount,
          avgWalkTime: totalDurationMins / volunteerCount,
          totalCommuteDistance: totalDistCommuted,
          totalVisitCount: totalVisits,
          totalWalkDistance: totalDistWalked,
          totalWalkTime: totalDurationMins,
        }

        return volunteerStats;

      } catch (err: unknown) {
        //#region  //*=========== For logging ===========
        if (err instanceof FirestoreError) {
          console.error(err.message)
        } else console.error(err)
        //#endregion  //*======== For logging ===========
      }
    }

  return useQuery(['VolunteerStats'], queryFn)
}