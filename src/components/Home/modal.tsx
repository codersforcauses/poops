import React from 'react'
import { useState} from 'react'
import Image from 'next/image'


// interface Mode {
//   start: Number
//   stop: Number
// }


function Modal() {
  // var total = 0
  // if (props.stop > 0){
  //   total = props.stop - props.start
  // }
  const [modalIsOpen, setModalOpen] = useState(false)
  const [type, setType] = useState("TYPE OF VISIT")
  const [pet, setPet] = useState("SELECT PET")
  const [distance, setDistance] = useState(0)
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
        {/* <label htmlFor='start'>Start : </label>
        <input type='text' id='start' name='start' value={props.start}/>
        <br />
        <label htmlFor='stop'>End : </label>  
        <input type='text' id='stop' name='stop' value={props.stop}></input>
        <br />
        <label htmlFor='total'>Total time : </label>
        <input type='text' id='total' name='total' value={total}></input>
        <br /> */}
        <select id='pets' name='pets' onChange={e => setPet(e.target.value)}>
        <option value='SELECT PET'>SELECT PET</option>
          <option value='Willow'>Willow</option>
          <option value='Nala'>Nala</option>
          <option value='Coco'>Coco</option>
          <option value='Gigi'>Gigi</option>
        </select>
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
    {(((type == "Vet" || type == "Transportation") && pet != "SELECT PET" && distance == 0 && modalIsOpen) || (type == "Walk" && pet != "SELECT PET" && distance > 0 && modalIsOpen)) && (
          <button
            className='relative h-[37px] w-[150px] rounded-lg bg-poops-dark-red text-xl font-semibold text-white'
            onClick={() => {
              setModalOpen(false)
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

