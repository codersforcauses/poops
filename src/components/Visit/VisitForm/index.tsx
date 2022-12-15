import { useContext, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Timestamp } from 'firebase/firestore'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/UI/button'
import Form from '@/components/UI/FormComponents/Form'
import { FormContext } from '@/components/UI/FormComponents/Form/context'
import {
  CreateSelect,
  CustomSelect,
  DurationSelect
} from '@/components/UI/FormComponents/SelectFields'
import { SelectOption } from '@/components/UI/FormComponents/SelectFields/utils'
import TextField from '@/components/UI/FormComponents/TextField'
import validationSchema from '@/components/Visit/VisitForm/validation'
import { useFirestore } from '@/context/Firebase/Firestore/context'
import { Duration, VisitData } from '@/types/types'
import { defaultCommuteMethods, formatTimestamp, visitTypes } from '@/utils'

interface VisitFormProps {
  id: number | null
  visitData: VisitData | null
}

interface ClientInfo {
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

export const VisitForm = ({ visitData, id }: VisitFormProps) => {
  const { userDoc, updateVisit } = useFirestore()
  const { reset } = useContext(FormContext)
  const router = useRouter()

  const handleSubmit: SubmitHandler<FormValues> = (formData) => {
    const data: VisitData = {
      type: formData.visitType.value,
      clientName: formData.clientName.value.clientName,
      petNames: formData.clientName.value.petNames, // TODO GET PET NAMES FROM CONTACTS
      startTime: Timestamp.fromDate(new Date(formData.startTime)),
      duration: formData.duration,
      walkDist: formData.walkDist,
      commuteDist: formData.commuteDist,
      commuteMethod: formData.commuteMethod.value,
      notes: formData.notes
    }

    // console.log(data)

    if (visitData && id) {
      userDoc.visits[id] = data
    } else {
      userDoc.visits.push(data)
    }

    updateVisit?.(userDoc)
    router.push('/visit')
    // TODO: add alert?
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
      {/* could rewrite to use awful react-select to make chevron icon consistent */}
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
          options={userDoc.contacts.map((contact) => {
            return {
              label: contact.clientName,
              value: {
                clientName: contact.clientName,
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
      </div>
    </Form>
  )
}

export type VisitFormValues = keyof FormValues
