import { useState } from 'react'

import ClientSelector from '@/components/Home/clientSelector'
import CommuteSelector from '@/components/Home/commuteSelector'
import TextForm from '@/components/Home/textForm'
import TypeSelector from '@/components/Home/typeSelector'
import FormField from '@/components/Visit/formfield'
import { AlertVariant, useAlert } from '@/context/AlertContext'

function Modal() {
  const [commute, setCommute] = useState('')
  const [client, setClient] = useState('')
  const [type, setType] = useState('')
  const [walkDistance, setWalkDistance] = useState(0)
  const [startTime, setStartTime] = useState('')
  const [other, setOther] = useState('')
  const [commuteDistance, setCommuteDistance] = useState(0)
  // const [startTime, setStartTime] = useState<Timestamp>()
  // const [endTime, setEndTime] = useState<Timestamp>()
  const { setAlert } = useAlert()

  function fullyFilled() {
    return (
      (commute == 'Walk' ||
        commute == 'Drive' ||
        commute == 'Public Transport' ||
        (commute == 'Other' && other != '')) &&
      commuteDistance > 0 &&
      client.length > 0 &&
      (type == 'Vet' ||
        (type == 'Walk' && walkDistance > 0 && !isNaN(walkDistance))) &&
      startTime != ''
    )
  }

  function handleSubmit() {
    setClient('')
    setType('')
    setCommute('')
    setWalkDistance(0)
    setOther('')
    setCommuteDistance(0)
    setStartTime('')
    setAlert({
      variant: AlertVariant.info,
      title: 'Visit has been recorded',
      text: 'Any changes can be made in Visit Page',
      position: 'bottom',
      showFor: 2500
    })
  }

  return (
    <div className='text-center'>
      <div className='rounded-lg bg-zinc-200 py-4 px-5 text-center shadow-lg sm:py-4'>
        <h1 className='mb-2 text-xl text-dark-red'>
          <b>Visit Details</b>
        </h1>
        <hr className='mb-3 h-0.5 border-dark-red bg-dark-red text-dark-red' />
        <form>
          <div>
            <CommuteSelector commute={commute} setCommute={setCommute} />
            {commute == 'Other' && (
              <TextForm
                id='other'
                label='Other Commute Method'
                onChange={(e) => setOther(String(e.target.value))}
              />
            )}
            <TextForm
              id='commuteDistance'
              label='Commute Distance (in km)'
              onChange={(e) => setCommuteDistance(Number(e.target.value))}
            />
            <ClientSelector client={client} setClient={setClient} />
            <TypeSelector type={type} setType={setType} />
          </div>
          {type == 'Walk' && (
            <TextForm
              id='walkDistance'
              label='Walk Distance (in km)'
              onChange={(e) => setWalkDistance(Number(e.target.value))}
            />
          )}

          <FormField
            id='startTimeInput'
            type='dateTime-local'
            placeholder='Start Time'
            label='Start Time:'
            isRequired={true}
            onChange={(event) => setStartTime(event.target.value)}
          />

          <button
            className='relative m-2 h-[30px] w-[120px] rounded-lg bg-dark-red text-lg font-semibold text-white disabled:bg-dark-gray'
            disabled={!fullyFilled()}
            onClick={() => {
              handleSubmit()
            }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  )
}

export default Modal
