import React from 'react'
import { useState } from 'react'

import ClientSelector from '@/components/Home/clientSelector'
import CommuteSelector from '@/components/Home/commuteSelector'
import TextForm from '@/components/Home/textForm'
import TypeSelector from '@/components/Home/typeSelector'

function Modal() {
  const [modalIsOpen, setModalOpen] = useState(false)
  const [commute, setCommute] = useState('')
  const [clients, setClients] = useState<string[]>([])
  const [type, setType] = useState('')
  const [walkDistance, setWalkDistance] = useState(0)
  const [other, setOther] = useState('')
  const [commuteDistance, setCommuteDistance] = useState(0)

  function formIsFilled() {
    return (
      commuteDistance > 0 &&
      (commute == 'Walk' ||
        commute == 'Drive' ||
        commute == 'Public Transport' ||
        (commute == 'Other' && other != '')) &&
      (type == 'Vet' || (type == 'Walk' && walkDistance > 0)) &&
      clients.length > 0
    )
  }

  return (
    <div className='text-center'>
      {/* If modal is closed, display start button */}
      {!modalIsOpen && (
        <button
          className='relative h-[30px] w-[120px] rounded-lg bg-dark-red text-lg font-semibold text-white'
          onClick={() => {
            setModalOpen(true)
          }}
        >
          START VISIT
        </button>
      )}

      {/* Displays modal */}
      {modalIsOpen && (
        <div className='rounded-lg bg-zinc-200 py-4 px-5 text-center shadow-lg sm:py-4'>
          <h1 className='mb-2 text-xl text-dark-red'>
            <b>Visit Details</b>
          </h1>
          <hr className='mb-3 h-0.5 border-dark-red bg-dark-red text-dark-red' />

          {/* Visit Form */}
          <form>
            {/* Commute Distance Form */}
            <TextForm
              id='commuteDistance'
              type='text'
              placeholder='Enter...'
              label='Commute Distance (in km)'
              isRequired={true}
              onChange={(e) => setCommuteDistance(Number(e.target.value))}
            />

            {/* Commute Selector Form */}
            <CommuteSelector commute={commute} setCommute={setCommute} />

            {/* Other Form if commute is 'Other' */}
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

            {/* Pet Selector Form */}
            <ClientSelector clients={clients} setClients={setClients} />

            {/* Type Selector Form */}
            <TypeSelector type={type} setType={setType} />

            {/* Distance Form if type is 'Walk' */}
            {type == 'Walk' && (
              <TextForm
                id='walkDistance'
                type='text'
                placeholder='Enter...'
                label='Walk Distance (in km)'
                isRequired={true}
                onChange={(e) => setWalkDistance(Number(e.target.value))}
              />
            )}
          </form>
        </div>
      )}
      <br />
      <div className='text-center'>
        {/* If modal is opened, display cancel button. Once all information has been filled display stop button*/}
        {modalIsOpen && (
          <button
            className='relative h-[30px] w-[120px] rounded-lg bg-dark-red text-lg font-semibold text-white'
            onClick={() => {
              setModalOpen(false),
                setClients([]),
                setType(''),
                setCommute(''),
                setWalkDistance(0),
                setOther(''),
                setCommuteDistance(0)
            }}
          >
            {formIsFilled() ? 'STOP VISIT' : 'CANCEL'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Modal
