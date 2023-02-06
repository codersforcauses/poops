import { useContext } from 'react'
import { OnChangeValue } from 'react-select'

import { FormContext } from '@/components/UI/FormComponents/Form/context'
import {
  CreateSelect,
  CustomSelect,
  DurationSelect
} from '@/components/UI/FormComponents/SelectFields'
import TextField from '@/components/UI/FormComponents/TextField'
import { ClientInfo, FormValues } from '@/components/Visit/VisitForm'
import validationSchema from '@/components/Visit/VisitForm/validation'
import { useContacts } from '@/hooks/contacts'
import { useVisits } from '@/hooks/visits'
import { Contact, SelectOption } from '@/types/types'
import { commuteMethods, visitTypes } from '@/utils/defaults'

const FormFields = () => {
  const { data: contacts } = useContacts()
  const { data: visits } = useVisits()
  const { reset } = useContext(FormContext)

  const fillValues = (data: OnChangeValue<SelectOption<ClientInfo>, false>) => {
    const clientName = data?.label
    const latestVisit = visits?.find((v) => v.clientName == clientName)

    if (!latestVisit) return
    const d: Partial<FormValues> = {
      duration: latestVisit.duration,
      walkDist: latestVisit.walkDist,
      commuteDist: latestVisit.commuteDist,
      commuteMethod: {
        label: latestVisit.commuteMethod,
        value: latestVisit.commuteMethod
      }
    }

    reset?.(d)
  }
  return (
    <>
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
        onChange={fillValues}
      />
      <CustomSelect<SelectOption<string>, false>
        label='Visit Type:'
        name='visitType'
        options={visitTypes}
        isClearable
        isSearchable
        rules={validationSchema.visitType}
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
        options={commuteMethods}
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
        placeholder='Add notes here'
        rules={validationSchema.notes}
      />
    </>
  )
}

export default FormFields
