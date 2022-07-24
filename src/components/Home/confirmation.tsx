import DisplayForm from '@/components/Home/displayForm'

export interface FormFieldProps {
  commute: string
  isOther: boolean
  other: string
  commuteDistance: number
  clients: string
  type: string
  isWalk: boolean
  walkDistance: number
  duration: string
}

function Confirmation(props: FormFieldProps) {
  return (
    <div>
      <DisplayForm id='commute' label='Commute Method' value={props.commute} />
      {props.isOther && (
        <DisplayForm
          id='other'
          label='Other Commute Method'
          value={props.other}
        />
      )}
      <DisplayForm
        id='commuteDistance'
        label='Commute Distance'
        value={props.commuteDistance}
      />
      <DisplayForm
        id='clients'
        label='Clients Selected'
        value={props.clients}
      />
      <DisplayForm id='type' label='Type of Visit' value={props.type} />
      {props.isWalk && (
        <DisplayForm
          id='walkDistance'
          label='Walk Distance'
          value={props.walkDistance}
        />
      )}
      <DisplayForm
        id='duration'
        label='Visit Duration'
        value={props.duration}
      />
    </div>
  )
}

export default Confirmation
