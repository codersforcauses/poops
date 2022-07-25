import { useEffect, useState } from 'react'
import { Timestamp } from 'firebase/firestore'

import ClientSelector from '@/components/Home/clientSelector'
import CommuteSelector from '@/components/Home/commuteSelector'
import Confirmation from '@/components/Home/confirmation'
import DisplayForm from '@/components/Home/displayForm'
import TextForm from '@/components/Home/textForm'
import TypeSelector from '@/components/Home/typeSelector'
import { AlertVariant, useAlert } from '@/context/AlertContext'
import { useFirestore } from '@/context/firestore'
import type { VisitData } from '@/types/types'

function Modal() {
  const [visitStarted, setVisit] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [commute, setCommute] = useState('')
  const [clients, setClients] = useState<string[]>([])
  const [type, setType] = useState('')
  const [walkDistance, setWalkDistance] = useState(0)
  const [other, setOther] = useState('')
  const [commuteDistance, setCommuteDistance] = useState(0)
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date(startTime))

  const { setAlert } = useAlert()

  const { userDoc, updateVisit } = useFirestore()

  // for (let visit of allVisits) {
  //   console.log("test")
  //   if (visit.inProgress) {
  //     setVisit(true)
  //     setRunning(true)
  //     setType(visit.type)
  //     setClients(visit.clientName)
  //     setStartTime(new Date(visit.startTime.toDate()))
  //     setCommuteDistance(visit.commuteDist)
  //     setCommute(visit.commuteMethod)
  //     break
  //   }
  // }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    interval = setTimeout(() => {
      null
    }, 0)
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000)
      }, 1000)
    } else if (!running) {
      window.clearInterval(interval)
    }
    return () => window.clearInterval(interval)
  }, [running])

  const duration = endTime.getTime() - startTime.getTime()

  const hour = (
    '0' +
    (Math.floor(duration / 3600000) + Math.floor(time / 3600000))
  ).slice(-2)
  const minute = (
    '0' +
    (Math.floor((duration / 60000) % 60) + Math.floor((time / 60000) % 60))
  ).slice(-2)
  const second = (
    '0' +
    (Math.floor((duration / 1000) % 60) + ((time / 1000) % 60))
  ).slice(-2)
  const timeDisplay = hour + ':' + minute + ':' + second

  function halfFilled() {
    return (
      (commute == 'Walk' ||
        commute == 'Drive' ||
        commute == 'Public Transport' ||
        (commute == 'Other' && other != '')) &&
      commuteDistance > 0 &&
      clients.length > 0 &&
      (type == 'Vet' || type == 'Walk')
    )
  }

  function fullyFilled() {
    return (
      (commute == 'Walk' ||
        commute == 'Drive' ||
        commute == 'Public Transport' ||
        (commute == 'Other' && other != '')) &&
      commuteDistance > 0 &&
      clients.length > 0 &&
      (type == 'Vet' ||
        (type == 'Walk' && walkDistance > 0 && !isNaN(walkDistance)))
    )
  }

  function showWalkDist() {
    return visitStarted && type == 'Walk'
  }

  return (
    <div className='text-center'>
      <div className='rounded-lg bg-zinc-200 py-4 px-5 text-center shadow-lg sm:py-4'>
        <h1 className='mb-2 text-xl text-dark-red'>
          {confirmation ? <b>Your Visit Details</b> : <b>Visit Details</b>}
        </h1>
        <hr className='mb-3 h-0.5 border-dark-red bg-dark-red text-dark-red' />
        <form>
          {!visitStarted && !confirmation && (
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
              <ClientSelector clients={clients} setClients={setClients} />
              <TypeSelector type={type} setType={setType} />
            </div>
          )}

          {halfFilled() && showWalkDist() && (
            <TextForm
              id='walkDistance'
              label='Walk Distance (in km)'
              onChange={(e) => setWalkDistance(Number(e.target.value))}
            />
          )}
        </form>

        {confirmation && (
          <Confirmation
            commute={commute}
            isOther={commute == 'Other'}
            other={other}
            commuteDistance={commuteDistance}
            clients={clients.join(', ')}
            type={type}
            isWalk={type == 'Walk'}
            walkDistance={walkDistance}
            duration={timeDisplay}
          />
        )}

        {halfFilled() && visitStarted && (
          <DisplayForm
            id='duration'
            label='Visit Duration'
            value={timeDisplay}
          />
        )}

        {!visitStarted && !confirmation && (
          <button
            className='m-2 h-[30px] w-[120px] rounded-lg bg-dark-red text-lg font-semibold text-white marker:relative disabled:bg-dark-gray'
            disabled={!halfFilled()}
            onClick={() => {
              const d = new Date()
              setStartTime(d)
              setEndTime(d)
              setVisit(true)
              setRunning(true)
              const dataStart: VisitData = {
                type: type,
                clientName: clients,
                startTime: Timestamp.fromDate(startTime),
                endTime: Timestamp.fromDate(endTime),
                walkDist: 0,
                commuteDist: commuteDistance,
                commuteMethod: commute,
                notes: '', // in progress
                inProgress: true
              }
              userDoc.visits.push(dataStart)
              //console.log(userDoc.visits)
              updateVisit?.(userDoc)
            }}
          >
            START VISIT
          </button>
        )}

        {visitStarted && (
          <button
            className='relative m-2 h-[30px] w-[120px] rounded-lg bg-dark-red text-lg font-semibold text-white disabled:bg-dark-gray'
            disabled={!fullyFilled()}
            onClick={() => {
              setVisit(false)
              setConfirmation(true)
              setRunning(false)
              const d = new Date()
              setEndTime(d)
              const dataStop: VisitData = {
                type: type,
                clientName: clients,
                startTime: Timestamp.fromDate(startTime),
                endTime: Timestamp.fromDate(d),
                walkDist: walkDistance,
                commuteDist: commuteDistance,
                commuteMethod: commute,
                notes: '', // in progress
                inProgress: false
              }
              for (let i = 0; i < userDoc.visits.length; i++) {
                if (userDoc.visits[i].inProgress) {
                  userDoc.visits[i] = dataStop
                  break
                }
              }
              //console.log(userDoc.visits)
              updateVisit?.(userDoc)
            }}
          >
            STOP VISIT
          </button>
        )}

        {confirmation && (
          <button
            className='relative m-2 h-[30px] w-[120px] rounded-lg bg-dark-red text-lg font-semibold text-white'
            onClick={() => {
              setConfirmation(false),
                setClients([]),
                setType(''),
                setCommute(''),
                setWalkDistance(0),
                setOther(''),
                setCommuteDistance(0),
                setTime(0),
                setAlert({
                  variant: AlertVariant.info,
                  title: 'Visit has been recorded',
                  text: 'Any changes can be made in Visit Page',
                  position: 'top',
                  showFor: 2500
                })
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
