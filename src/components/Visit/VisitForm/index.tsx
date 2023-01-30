import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { Timestamp } from 'firebase/firestore'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/UI/button'
import Form from '@/components/UI/FormComponents/Form'
import { SelectOption } from '@/components/UI/FormComponents/SelectFields/utils'
import FormFields from '@/components/Visit/VisitForm/formfields'
import { useMutateVisits } from '@/hooks/visits'
import { Duration, Visit } from '@/types/types'
import { formatTimestamp, visitTypes } from '@/utils'

interface VisitFormProps {
  visitData?: Visit
}

export interface ClientInfo {
  clientName: string
  petNames: string
}

export interface FormValues {
  visitType: SelectOption<string>
  clientName: SelectOption<ClientInfo>
  startTime: string
  duration: Duration
  walkDist: number
  commuteDist: number
  commuteMethod: SelectOption<string>
  notes: string
}

export const VisitForm = ({ visitData }: VisitFormProps) => {
  const { mutate: mutateVisits } = useMutateVisits()
  const router = useRouter()

  const isNewVisit = visitData === undefined || visitData?.docId === null

  const handleSubmit: SubmitHandler<FormValues> = async (
    formData: FormValues
  ) => {
    const data: Visit = {
      docId: isNewVisit ? undefined : visitData?.docId,
      type: formData.visitType.value,
      clientName: formData.clientName.value.clientName,
      petNames: formData.clientName.value.petNames,
      startTime: Timestamp.fromDate(new Date(formData.startTime)),
      duration: formData.duration,
      walkDist: formData.walkDist,
      commuteDist: formData.commuteDist,
      commuteMethod: formData.commuteMethod.value,
      notes: formData.notes
    }

    mutateVisits(data)

    router.push('/visit')
  }

  const handleDelete = async () => {
    mutateVisits({ docId: visitData?.docId })

    router.push('/visit')
  }

  return (
    <Form<FormValues>
      onSubmit={handleSubmit}
      defaultValues={useMemo(() => {
        if (visitData) {
          const d: Partial<FormValues> = {
            visitType: { label: visitData.type, value: visitData.type },
            clientName: {
              label: visitData.clientName,
              value: {
                clientName: visitData.clientName,
                petNames: visitData.petNames
              }
            },
            startTime: formatTimestamp(visitData.startTime) || '',
            duration: visitData.duration,
            walkDist: visitData.walkDist,
            commuteDist: visitData.commuteDist,
            commuteMethod: {
              label: visitData.commuteMethod,
              value: visitData.commuteMethod
            },
            notes: visitData.notes
          }
          return d
        }
        return { visitType: visitTypes[0] }
      }, [visitData])}
    >
      <div className='grid grid-cols-2 gap-4'>
        <FormFields />
        <Button
          className='col-span-2'
          intent='primary'
          fullwidth
          size='large'
          type='submit'
        >
          Submit
        </Button>
        <Button
          className='col-span-2'
          intent='secondary'
          fullwidth
          onClick={handleDelete}
          hidden={isNewVisit} // button should be hidden if no id
          type='button'
        >
          Remove This Visit
        </Button>
      </div>
    </Form>
  )
}

export type VisitFormValues = keyof FormValues
