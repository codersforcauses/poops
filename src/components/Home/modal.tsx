import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { default as ReactSelect } from 'react-select'
import { components } from 'react-select'
// import { doc, setDoc, Timestamp } from 'firebase/firestore'

// const docData = {
//   startTime: Timestamp.now(),
//   stopTime: Timestamp.now(),
//   duration: stopTime - startTime,
//   pets: petSelected,
//   typeOfVisit: type,
//   distanceWalked: distance
// }

// await setDoc(doc(db,'collectionName','id'), docData);

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type='checkbox'
          checked={props.isSelected}
          onChange={() => null}
        />{' '}
        <label>{props.label}</label>
      </components.Option>
    </div>
  )
}

function Modal() {
  const [modalIsOpen, setModalOpen] = useState(false)
  const [type, setType] = useState('TYPE OF VISIT')
  // const [pet, setPet] = useState('SELECT PET')
  const [distance, setDistance] = useState(0)
  const [petSelected, setSelected] = useState([])

  const pets = [
    { value: 'Willow', label: 'Willow' },
    { value: 'Nala', label: 'Nala' },
    { value: 'Coco', label: 'Coco' },
    { value: 'Nigi', label: 'Nigi' }
  ]

  const types = [
    { value: 'Vet', label: 'Vet' },
    { value: 'Walk', label: 'Walk' },
    { value: 'Transportation', label: 'Transportation' }
  ]

  const handleChange = (selected: React.SetStateAction<never[]>) => {
    setSelected(selected)
  }

  const handleTypeChange = (selected: {
    value: React.SetStateAction<string>
  }) => {
    setType(selected.value)
  }

  return (
    <div>
      <div className='text-center'>
        {!modalIsOpen && (
          <button
            className='relative h-[37px] w-[150px] rounded-lg bg-poops-dark-red text-xl font-semibold text-white'
            onClick={() => {
              setModalOpen(true)
            }}
          >
            START VISIT
          </button>
        )}
      </div>
      <div>
        {modalIsOpen && (
          <div
            className='rounded-lg bg-grey p-3 py-2 px-5 text-center shadow-lg sm:py-4'
            style={{ minWidth: 500, minHeight: 300 }}
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
            <form style={{ fontSize: 18 }}>
              <ReactSelect
                options={pets}
                name='pets'
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option
                }}
                onChange={handleChange}
                value={petSelected}
              />
              <br />

              <ReactSelect
                options={types}
                name='type'
                components={{
                  Option
                }}
                onChange={handleTypeChange}
                value={type.value}
              />

              <div>
                {type == 'Walk' && (
                  <form>
                    <br></br>
                    <label htmlFor='distance'>Distance Walked (in km) : </label>
                    <input
                      type='text'
                      name='distance'
                      onChange={(e) => setDistance(Number(e.target.value))}
                    />
                  </form>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
      <br />
      <div className='text-center'>
        {(((type == 'Vet' || type == 'Transportation') &&
          petSelected.length > 0 &&
          distance == 0 &&
          modalIsOpen) ||
          (type == 'Walk' &&
            petSelected.length > 0 &&
            distance > 0 &&
            modalIsOpen)) && (
          <button
            className='relative h-[37px] w-[150px] rounded-lg bg-poops-dark-red text-xl font-semibold text-white'
            onClick={() => {
              setModalOpen(false),
                setType('TYPE OF VISIT'),
                // setPet('SELECT PET'),
                setDistance(0)
            }}
          >
            STOP VISIT
          </button>
        )}
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
    </div>
  )
}

export default Modal
