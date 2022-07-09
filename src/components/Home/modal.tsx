import React from 'react'
import { useState} from 'react'
import { default as ReactSelect } from "react-select"
import { components } from "react-select"
import Image from 'next/image'

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};


function Modal() {

  const [modalIsOpen, setModalOpen] = useState(false)
  const [type, setType] = useState("TYPE OF VISIT")
  const [pet, setPet] = useState("SELECT PET")
  const [distance, setDistance] = useState(0)
  const [optionSelected, setSelected] = useState("")

  const pets = [
    { value: 'Willow', label: 'Willow' },
    { value: 'Nala', label: 'Nala' },
    { value: 'Coco', label: 'Coco' },
    { value: 'Nigi', label: 'Nigi' }
  ]

  const handleChange = (selected) => {
    setSelected(selected)
  };
  
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
    <div >{modalIsOpen &&
      <div className='rounded-lg bg-grey p-3 py-2 px-5 text-center shadow-lg sm:py-4' style={{minWidth: 500}}><h1 style={{ fontSize: 25, color: '#a52a2a' }}>
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
        {/* <select id='pets' name='pets' onChange={e => setPet(e.target.value)}>
        <option value='SELECT PET'>SELECT PET</option>
          <option value='Willow'>Willow</option>
          <option value='Nala'>Nala</option>
          <option value='Coco'>Coco</option>
          <option value='Gigi'>Gigi</option>
        </select> */}
        <ReactSelect
          options={pets}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={handleChange}
          value={optionSelected}
        />  
        <br></br>
        <br></br>   
        <select id='type' name='type' onChange={e => setType(e.target.value)}>
          <option value='TYPE OF VISIT'>TYPE OF VISIT</option>
          <option value='Vet'>Vet</option>
          <option value='Walk'>Walk</option>
          <option value='Transportation'>Transportation</option>
        </select>
        <div>{type=="Walk" && (<form><br></br><label>Distance Walked: </label><br></br><br></br><input type="text" name="distance" onChange={e => setDistance(Number(e.target.value))} /></form>)}</div>
      </form></div>}
    </div> 
    <br></br>
    <div className='text-center'>
    {(((type == "Vet" || type == "Transportation") && optionSelected && distance == 0 && modalIsOpen) || (type == "Walk" && optionSelected && distance > 0 && modalIsOpen)) && (
          <button
            className='relative h-[37px] w-[150px] rounded-lg bg-poops-dark-red text-xl font-semibold text-white'
            onClick={() => {
              setModalOpen(false), setType("TYPE OF VISIT"), setPet("SELECT PET"), setDistance(0)
            }}
          >
            STOP VISIT
          </button>
        )}
        <div>{!modalIsOpen && <Image alt='logo' src='/images/dog.png' width='350px' height='250px' />}</div>
    </div>
    </div>
  )
}

export default Modal

