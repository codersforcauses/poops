import React from 'react'
import { useState } from 'react'

import PetSelector from '@/components/Home/petSelector'
import TypeSelector from '@/components/Home/typeSelector'

function Modal() {
  const [modalIsOpen, setModalOpen] = useState(false)
  const [pets, setPets] = useState<string[]>([])
  const [type, setType] = useState('')
  const [distance, setDistance] = useState(0)
  return (
    <div>
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

        {/* If modal is opened, display stop button */}
        {(((type == 'Vet' || type == 'Transportation') &&
          pets.length > 0 &&
          distance == 0 &&
          modalIsOpen) ||
          (type == 'Walk' &&
            pets.length > 0 &&
            distance > 0 &&
            modalIsOpen)) && (
          <button
            className='text-l relative h-[30px] w-[120px] rounded-lg bg-dark-red font-semibold text-white'
            onClick={() => {
              setModalOpen(false), setDistance(0)
            }}
          >
            STOP VISIT
          </button>
        )}
      </div>
      <div>
        {/* Displays modal */}
        {modalIsOpen && (
          <div
            className='rounded-lg p-3 py-2 px-5 text-center shadow-lg sm:py-4'
            style={{
              padding: 40,
              background: '#F9F9F9',
              margin: 20
            }}
          >
            <h1 style={{ fontSize: 25, color: '#a52a2a' }}>
              <b>Visit Details</b>
            </h1>
            <hr
              style={{
                background: '#a52a2a',
                color: '#a52a2a',
                borderColor: '#a52a2a',
                height: '2px'
              }}
            />
            <br />

            {/* Visit Form */}
            <form style={{ fontSize: 18 }}>
              {/* Pet Selector Form */}
              <PetSelector pets={pets} setPets={setPets} />
              <br />

              {/* Type Selector Form */}
              <TypeSelector type={type} setType={setType} />

              {/* Distance Form if type is 'Walk' */}
              {type == 'Walk' && (
                <form>
                  <br />
                  <label htmlFor='distance'>Distance Walked (in km) : </label>
                  <input
                    type='text'
                    name='distance'
                    onChange={(e) => setDistance(Number(e.target.value))}
                  />
                </form>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
