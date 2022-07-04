import React from 'react'

interface Mode {
  start: Number
  stop: Number
}


function Modal(props: Mode) {
  var total = 0
  if (props.stop > 0){
    total = props.stop - props.start
  }
  return (
    <div className='rounded-lg bg-grey p-3 py-2 px-5 text-center shadow-lg sm:py-4'>
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
      <form style={{ fontSize: 20 }}>
        <label htmlFor='start'>Start : </label>
        <input type='text' id='start' name='start' value={props.start}/>
        <br />
        <label htmlFor='stop'>End : </label>  
        <input type='text' id='stop' name='stop' value={props.stop}></input>
        <br />
        <label htmlFor='total'>Total time : </label>
        <input type='text' id='total' name='total' value={total}></input>
        <br />
        <select id='pets' name='pets'>
        <option value='SELECT PET'>SELECT PET</option>
          <option value='Willow'>Willow</option>
          <option value='Nala'>Nala</option>
          <option value='Coco'>Coco</option>
          <option value='Gigi'>Gigi</option>
        </select>
      </form>
    </div>
  )
}

export default Modal

