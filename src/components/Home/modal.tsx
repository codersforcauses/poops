import { useState } from 'react'

import ClientSelector from '@/components/Home/clientSelector'
import CommuteSelector from '@/components/Home/commuteSelector'
import StopWatch from '@/components/Home/stopWatch'
import TextForm from '@/components/Home/textForm'
import TypeSelector from '@/components/Home/typeSelector'
import { AlertVariant, useAlert } from '@/context/AlertContext'

function Modal() {
  const [visitStarted, setVisit] = useState(false)
  const [final, setFinal] = useState(false)
  const [commute, setCommute] = useState('')
  const [clients, setClients] = useState<string[]>([])
  const [type, setType] = useState('')
  const [walkDistance, setWalkDistance] = useState(0)
  const [other, setOther] = useState('')
  const [commuteDistance, setCommuteDistance] = useState(0)
  // const [startTime, setStartTime] = useState<Timestamp>()
  // const [endTime, setEndTime] = useState<Timestamp>()
  const { setAlert } = useAlert()

  function alertUser(text: string) {
    setAlert({
      variant: AlertVariant.info,
      text: text,
      position: 'top',
      showFor: 1500
    })
  }

  function formIsFilled() {
    return (
      commuteDistance > 0 &&
      (commute == 'Walk' ||
        commute == 'Drive' ||
        commute == 'Public Transport' ||
        (commute == 'Other' && other != '')) &&
      (type == 'Vet' || type == 'Walk') &&
      clients.length > 0
    )
  }

  return (
    <div className='text-center'>
      <div className='rounded-lg bg-zinc-200 py-4 px-5 text-center shadow-lg sm:py-4'>
        <h1 className='mb-2 text-xl text-dark-red'>
          {final ? <b>Confirm Details</b> : <b>Visit Details</b>}
        </h1>
        <hr className='mb-3 h-0.5 border-dark-red bg-dark-red text-dark-red' />
        <form>
          {!visitStarted && (
            <div>
              <CommuteSelector commute={commute} setCommute={setCommute} />
              <TextForm
                id='commuteDistance'
                type='text'
                placeholder='Enter...'
                label='Commute Distance (in km)'
                isRequired={true}
                onChange={(e) => setCommuteDistance(Number(e.target.value))}
              />
              {commute == 'Other' && (
                <TextForm
                  id='other'
                  type='text'
                  placeholder='Enter...'
                  label='Other Commute Method'
                  isRequired={true}
                  onChange={(e) => setOther(String(e.target.value))}
                />
              )}
              <ClientSelector clients={clients} setClients={setClients} />
              <TypeSelector type={type} setType={setType} />
            </div>
          )}

          {(visitStarted || final) && type == 'Walk' && (
            <div>
              <TextForm
                id='walkDistance'
                type='text'
                placeholder='Enter...'
                label='Walk Distance (in km)'
                isRequired={true}
                onChange={(e) => setWalkDistance(Number(e.target.value))}
              />
            </div>
          )}
        </form>

        {formIsFilled() && visitStarted && <StopWatch />}

        {!formIsFilled() && (
          <button className='relative m-2 h-[30px] w-[120px] cursor-default rounded-lg bg-dark-gray text-lg font-semibold text-white'>
            START VISIT
          </button>
        )}
        {formIsFilled() && !visitStarted && !final && (
          <button
            className='relative m-2 h-[30px] w-[120px] rounded-lg bg-dark-red text-lg font-semibold text-white'
            onClick={() => {
              setVisit(true) //setStartTime(Timestamp.now)
            }}
          >
            START VISIT
          </button>
        )}
        {formIsFilled() &&
          (walkDistance <= 0 || isNaN(walkDistance)) &&
          type != 'Vet' &&
          visitStarted && (
            <button className='relative m-2 h-[30px] w-[120px] cursor-default rounded-lg bg-dark-gray text-lg font-semibold text-white'>
              STOP VISIT
            </button>
          )}
        {formIsFilled() && (walkDistance > 0 || type == 'Vet') && visitStarted && (
          <button
            className='relative m-2 h-[30px] w-[120px] rounded-lg bg-dark-red text-lg font-semibold text-white'
            onClick={() => {
              setVisit(false), setFinal(true) //setEndTime(Timestamp.now)
            }}
          >
            STOP VISIT
          </button>
        )}

        {formIsFilled() && (walkDistance > 0 || type == 'Vet') && final && (
          <button
            className='relative m-2 h-[30px] w-[120px] rounded-lg bg-dark-red text-lg font-semibold text-white'
            onClick={() => {
              setFinal(false),
                setClients([]),
                setType(''),
                setCommute(''),
                setWalkDistance(0),
                setOther(''),
                setCommuteDistance(0),
                alertUser('Visit has been recorded')
            }}
          >
            SUBMIT
          </button>
        )}
      </div>
    </div>
  )
}

export default Modal
