import { AlertIcon } from '@/components/UI/alert'
import { useAlert } from '@/context/AlertContext'

// Sample alert use cases to simplify implementation

const AlertExamples = () => {
  const { setAlert } = useAlert()

  const buttonStyles =
    'mx-auto mt-2 w-fit rounded-lg bg-primary py-1 px-4 text-lg text-white shadow-md focus:outline-primary active:bg-dark-red'

  const confirmation = () => {
    // console.log(`ALERT CONFIRMED AT ` + new Date().toTimeString())
  }
  const cancelled = () => {
    // console.log(`ALERT CANCELLED AT ` + new Date().toTimeString())
  }
  return (
    <div className='[&>*]p-2 flex p-5'>
      <button
        className={buttonStyles}
        onClick={() => {
          setAlert({
            icon: AlertIcon.info,
            title: 'Info Icon',
            text: 'Confirm or deny this alert',
            confirmFunction: confirmation,
            cancelFunction: cancelled
          })
        }}
      >
        Info Example
      </button>
      <button
        className={buttonStyles}
        onClick={() => {
          setAlert({
            icon: AlertIcon.security,
            title: 'Security Icon',
            text: 'Bottom placed alert',
            position: 'bottom'
          })
        }}
      >
        Security Example
      </button>
      <button
        className={buttonStyles}
        onClick={() => {
          setAlert({
            icon: AlertIcon.warning,
            title: 'Warning Icon',
            text: 'Testing the critical alert'
          })
        }}
      >
        Critical Example
      </button>
      <button
        className={buttonStyles}
        onClick={() => {
          setAlert({
            icon: AlertIcon.comment,
            title: 'Comment Top',
            text: 'Comment alert, cancel function set to log current time'
          })
        }}
      >
        Comment Example
      </button>
    </div>
  )
}

export default AlertExamples
