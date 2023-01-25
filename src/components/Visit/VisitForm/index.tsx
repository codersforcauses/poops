import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { Timestamp } from 'firebase/firestore'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/UI/button'
import Form from '@/components/UI/FormComponents/Form'
import {
  CreateSelect,
  CustomSelect,
  DurationSelect
} from '@/components/UI/FormComponents/SelectFields'
import { SelectOption } from '@/components/UI/FormComponents/SelectFields/utils'
import TextField from '@/components/UI/FormComponents/TextField'
import validationSchema from '@/components/Visit/VisitForm/validation'
import { useContacts } from '@/hooks/contacts'
import { useMutateVisits } from '@/hooks/visits'
import { Contact, Duration, Visit } from '@/types/types'
import { defaultCommuteMethods, formatTimestamp, visitTypes } from '@/utils'

interface VisitFormProps {
  visitData?: Visit
}

interface ClientInfo {
  clientName: string
  petNames: string
}

interface FormValues {
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
  const { data: contacts } = useContacts()
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
      }, [visitData])}
    >
      <div className='grid grid-cols-2 gap-4'>
        <CustomSelect<SelectOption<string>, false>
          label='Visit Type:'
          name='visitType'
          options={visitTypes}
          isClearable
          isSearchable
          rules={validationSchema.visitType}
        />
        <CustomSelect<SelectOption<ClientInfo>, false>
          label='Client Name:'
          name='clientName'
          options={contacts?.map((contact: Contact) => {
            return {
              label: contact.name,
              value: {
                clientName: contact.name,
                petNames: contact.pets
              }
            }
          })}
          isClearable
          isSearchable
          rules={validationSchema.clientName}
        />
        <TextField
          label='Commute Distance:'
          type='number'
          step='0.01'
          name='commuteDist'
          placeholder='Distance (km)'
          rules={validationSchema.commuteDist}
        />
        <CreateSelect<SelectOption<string>, false>
          label='Commute Method:'
          name='commuteMethod'
          options={defaultCommuteMethods}
          isClearable
          isSearchable
          rules={validationSchema.commuteMethod}
        />
        <TextField
          className='col-span-2'
          label='Start Time:'
          name='startTime'
          type='dateTime-local'
          placeholder='Start Time'
          rules={validationSchema.startTime}
        />
        <DurationSelect
          name='duration'
          label='Duration:'
          rules={validationSchema.duration}
        />
        <TextField
          label='Walk Distance:'
          name='walkDist'
          type='number'
          step='0.01'
          placeholder='Distance (km)'
          rules={validationSchema.walkDist}
        />
        <TextField
          className='col-span-2'
          label='Notes:'
          type='textarea'
          name='notes'
          placeholder='Add notes here...'
          rules={validationSchema.notes}
        />

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
