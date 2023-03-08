import { Timestamp } from 'firebase/firestore'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string(),
  desc: z.string(),
  pets: z.string(),
  email: z.string().email(),
  phone: z.string(),
  streetAddress: z.string(),
  region: z.array(z.string()),
  notes: z.string(),
  tags: z.array(z.string())
})

const userSchema = z.object({
  info: contactSchema,
  stats: z.object({
    numVisits: z.number().gte(0),
    numHours: z.number().gte(0),
    commutedDist: z.number().gte(0),
    walkedDist: z.number().gte(0)
  })
})

const visitSchema = z.object({
  type: z.string(),
  clientName: z.string(),
  petNames: z.string(),
  startTime: z.instanceof(Timestamp),
  duration: z.object({
    hours: z.number().gte(0),
    minutes: z.number().gte(0)
  }),
  walkDist: z.number().gte(0),
  commuteDist: z.number().gte(0),
  commuteMethod: z.string(),
  notes: z.string()
})

const vetConcernSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  userEmail: z.string().email(),
  userPhone: z.string(),
  clientName: z.string(),
  petName: z.string(),
  vetName: z.string(),
  visitTime: z.instanceof(Timestamp),
  visitId: z.string(),
  detail: z.string(),
  createdAt: z.instanceof(Timestamp),
  status: z.union([z.literal('resolved'), z.literal('unresolved')]),
  imageUrl: z.string().url().optional()
})

const incidentSchema = z.object({
  userId: z.string(),
  userName: z.string().nullish(),
  visitId: z.string(),
  visitTime: z.instanceof(Timestamp),
  clientName: z.string(),
  email: z.string().email().nullish(),
  petName: z.string(),
  time: z.instanceof(Timestamp),
  details: z.string(),
  createdAt: z.instanceof(Timestamp),
  status: z.union([z.literal('resolved'), z.literal('unresolved')]),
  imageUrl: z.string().url().optional()
})

const volunteerStatsSchema = z.object({
  volunteerCount: z.number().gte(0),
  avgCommuteDistance: z.number().gte(0),
  avgVisitCount: z.number().gte(0),
  avgWalkDistance: z.number().gte(0),
  avgWalkTime: z.number().gte(0),
  totalCommuteDistance: z.number().gte(0),
  totalVisitCount: z.number().gte(0),
  totalWalkDistance: z.number().gte(0),
  totalWalkTime: z.number().gte(0)
})

export {
  contactSchema,
  incidentSchema,
  userSchema,
  vetConcernSchema,
  visitSchema,
  volunteerStatsSchema
}
