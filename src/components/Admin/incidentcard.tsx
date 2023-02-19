import React from 'react'
import moment from 'moment'

import { Incident } from '@/types/types'

const IncidentCard = (props: Incident) => {
  return (
    <div className='m-2 flex flex-col rounded-xl bg-gray-50 p-4 drop-shadow-default'>
      <div className='font-bold text-primary'>
        {props.clientName} {moment(props.reportTime.toDate())
              .format('YYYY-MM-DD HH:mm:ss')
              .toString()}
      </div>
      <div className='text-sm'>{props.userName}</div>
      <div>{props.userEmail}</div>
      <div>Report date: {moment(props.reportTime.toDate())
              .format('YYYY-MM-DD HH:mm:ss')
              .toString()}</div>
      <div>Visit ID: {props.visitId}</div>
      <div>Client: {props.clientName}</div>
      <div>Pet: {props.petName}</div>
      <div>
        <p>{props.detail}</p>
      </div>
    </div>
  )
}

export default IncidentCard
