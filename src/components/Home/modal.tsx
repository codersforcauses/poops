import React from 'react'
import { useState } from 'react'
import Image from 'next/image'

import CommuteSelector from '@/components/Home/commuteSelector'
import PetSelector from '@/components/Home/petSelector'
import TypeSelector from '@/components/Home/typeSelector'

function Modal() {
  const [modalIsOpen, setModalOpen] = useState(false)
  const [commute, setCommute] = useState('')
  const [pets, setPets] = useState<string[]>([])
  const [type, setType] = useState('')
  const [walkDistance, setWalkDistance] = useState(0)
  const [other, setOther] = useState('')
  const [commuteDistance, setCommuteDistance] = useState(0)

  return (
    <div className='text-center'>
      {/* If modal is closed, display start button */}
      {!modalIsOpen && (
        <button
          className='text-l relative h-[30px] w-[120px] rounded-lg bg-dark-red font-semibold text-white'
          onClick={() => {
            setModalOpen(true)
          }}
        >
          START VISIT
        </button>
      )}

      <div className='text-center'>
        {/* If modal is opened, display stop button */}
        {commuteDistance > 0 &&
          (commute == 'Walk' ||
            commute == 'Drive' ||
            commute == 'Public Transport' ||
            (commute == 'Other' && other != '')) &&
          (type == 'Vet' ||
            type == 'Transportation' ||
            (type == 'Walk' && walkDistance > 0)) &&
          pets.length > 0 && (
            <button
              className='text-l relative h-[30px] w-[120px] rounded-lg bg-dark-red font-semibold text-white'
              onClick={() => {
                setModalOpen(false),
                  setWalkDistance(0),
                  setOther(''),
                  setCommuteDistance(0)
              }}
            >
              STOP VISIT
            </button>
          )}
      </div>

      {/* Displays modal */}
      {modalIsOpen && (
        <div
          className='w-min-100 rounded-lg p-3 py-2 px-5 text-center shadow-lg sm:py-4'
          style={{
            padding: 25,
            background: '#F9F9F9'
          }}
        >
          <h1 style={{ fontSize: 20, color: '#a52a2a' }}>
            <b>Visit Details</b>
          </h1>
          <hr
            style={{
              background: '#a52a2a',
              color: '#a52a2a',
              borderColor: '#a52a2a',
              height: '1.5px'
            }}
          />
          <br />

          {/* Visit Form */}
          <form style={{ fontSize: 16 }}>
            {/* Commute Distance Form */}
            <label htmlFor='commuteDistance'>Commute Distance (in km) : </label>
            <input
              type='text'
              name='commuteDistance'
              onChange={(e) => setCommuteDistance(Number(e.target.value))}
            />
            <br />
            <br />

            {/* Commute Selector Form */}
            <CommuteSelector commute={commute} setCommute={setCommute} />
            <br />

            {/* Other Form if commute is 'Other' */}
            {commute == 'Other' && (
              <form>
                <label htmlFor='other'>Other Commute Method : </label>
                <input
                  type='text'
                  name='other'
                  onChange={(e) => setOther(String(e.target.value))}
                />
              </form>
            )}
            <br />

            {/* Pet Selector Form */}
            <PetSelector pets={pets} setPets={setPets} />
            <br />

            {/* Type Selector Form */}
            <TypeSelector type={type} setType={setType} />

            {/* Distance Form if type is 'Walk' */}
            {type == 'Walk' && (
              <form>
                <br />
                <label htmlFor='walkDistance'>Walk Distance (in km) : </label>
                <input
                  type='text'
                  name='walkDistance'
                  onChange={(e) => setWalkDistance(Number(e.target.value))}
                />
              </form>
            )}
          </form>
        </div>
      )}
      <br />
      <div>
        {!modalIsOpen && (
          <Image
            alt='logo'
            src='/images/dog.png'
            width='350px'
            height='250px'
          />
        )}
      </div>
    </div>
  )
}

export default Modal
