import { User, writeUserData } from 'databaseIntigration'

interface SubmitButtonProps {
  label: string
  data: User
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <button
      className='bg-primary'
      onClick={async () =>
        await writeUserData({
          firstName: props.firstName,
          lastName: props.lastName
        })
      }
    >
      {props.label}
    </button>
  )
}

export default SubmitButton
